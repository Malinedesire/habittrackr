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

export const calculateHabitStreaks = onSchedule(
  {
    schedule: "0 2 * * *",
    timeZone: "Europe/Stockholm",
  },
  async () => {
    const habitsSnap = await db
      .collection("habits")
      .where("isActive", "==", true)
      .get();

    for (const habitDoc of habitsSnap.docs) {
      const habitId = habitDoc.id;
      const habit = habitDoc.data();

      const logsSnap = await db
        .collection("habitLogs")
        .where("habitId", "==", habitId)
        .where("completed", "==", true)
        .get();

      const dates = logsSnap.docs.map((doc) => doc.data().date);

      let bestStreak = 0;
      let currentStreak = 0;

      if (habit.frequencyType === "daily") {
        bestStreak = getBestStreak(dates);
        currentStreak = getCurrentStreak(dates);
      }

      if (habit.frequencyType === "weekly") {
        bestStreak = getWeeklyBestStreak(dates, habit.targetPerPeriod);
        currentStreak = getWeeklyCurrentStreak(dates, habit.targetPerPeriod);
      }

      await habitDoc.ref.update({
        bestStreak,
        currentStreak,
        streakUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
);