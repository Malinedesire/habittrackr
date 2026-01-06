import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import {
  getBestStreak,
  getCurrentStreak,
  getWeeklyBestStreak,
  getWeeklyCurrentStreak,
} from "./utils/streak";

admin.initializeApp();
const db = admin.firestore();

console.log("Project:", process.env.GCLOUD_PROJECT);

export const calculateHabitStreaks = onSchedule(
  {
    schedule: "*/5 * * * *",
    timeZone: "Europe/Stockholm",
  },
  async () => {
    console.log("=== Running streak cron job ===");

    try {
      const usersSnap = await db.collection("users").get();
      console.log("Users count:", usersSnap.size);

      for (const userDoc of usersSnap.docs) {
        console.log(`--- User ${userDoc.id} ---`);

        try {
          const habitsSnap = await userDoc.ref
            .collection("habits")
            .where("isActive", "==", true)
            .get();

          console.log(`Active habits for user ${userDoc.id}:`, habitsSnap.size);

          for (const habitDoc of habitsSnap.docs) {
            const habitId = habitDoc.id;
            const habit = habitDoc.data();

            try {
              const dates: string[] = habit.completedDates ?? [];

              console.log(
                `[HABIT] ${habit.title} (${habitId})`,
                "freq:",
                habit.frequencyType,
                "dates:",
                dates
              );

              let bestStreak = 0;
              let currentStreak = 0;

              if (habit.frequencyType === "daily") {
                bestStreak = getBestStreak(dates);
                currentStreak = getCurrentStreak(dates);
              }

              if (habit.frequencyType === "weekly") {
                bestStreak = getWeeklyBestStreak(
                  dates,
                  habit.targetPerPeriod ?? 1
                );
                currentStreak = getWeeklyCurrentStreak(
                  dates,
                  habit.targetPerPeriod ?? 1
                );
              }

              console.log(
                `[STREAK RESULT] user=${userDoc.id} habit=${habit.title}`,
                {
                  bestStreak,
                  currentStreak,
                }
              );

              if (
                habit.bestStreak === bestStreak &&
                habit.currentStreak === currentStreak
              ) {
                console.log(
                  "[SKIP UPDATE] streak unchanged for habit",
                  habitId
                );
                continue;
              }

              await habitDoc.ref.update({
                bestStreak,
                currentStreak,
                streakUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
              });

              console.log("[UPDATED] habit", habitId);
            } catch (habitErr) {
              console.error(
                `[ERROR][HABIT] user=${userDoc.id} habit=${habitId}`,
                habitErr
              );
            }
          }
        } catch (userErr) {
          console.error(`[ERROR][USER] ${userDoc.id}`, userErr);
        }
      }

      console.log("=== Streak cron job finished ===");
    } catch (err) {
      console.error("[FATAL ERROR] streak cron job crashed", err);
    }
  }
);
