import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import type { Habit } from "../types/habit";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import "./Dashboard.css";
import DailyChallenge from "../components/challenges/DailyChallenge";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import HabitCard from "../components/dashboard/HabitCard";
import DashboardStats from "../components/dashboard/DashboardStats";
import {
  getCompletedLast7Days,
  getCompletedThisCalendarWeek,
} from "../utils/dateHelper";

const today = new Date().toISOString().split("T")[0];

const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      setError(null);
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const habitsRef = collection(db, "users", user.uid, "habits");
        const snapshot = await getDocs(habitsRef);

        const habitsData: Habit[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Habit, "id">),
        }));

        setHabits(habitsData);
      } catch {
        setError("Failed to load habits.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const completedToday = habits.filter((h) =>
    h.completedDates?.includes(today)
  ).length;

  const activeThisWeek = habits.filter((h) => {
    const completed =
      h.frequencyType === "weekly"
        ? getCompletedThisCalendarWeek(h.completedDates ?? [])
        : getCompletedLast7Days(h.completedDates ?? []);

    return completed > 0;
  }).length;

  const bestStreak = habits.reduce(
    (max, habit) => Math.max(max, habit.bestStreak ?? 0),
    0
  );

  const markHabitDone = async (habitId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(doc(db, "users", user.uid, "habits", habitId), {
      completedDates: arrayUnion(today),
    });

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? {
              ...h,
              completedDates: [...(h.completedDates ?? []), today],
            }
          : h
      )
    );
  };

  return (
    <main className="dashboard">
      <DashboardHeader />

      <DashboardStats
        habitCount={habits.length}
        completedToday={completedToday}
        activeThisWeek={activeThisWeek}
        bestStreak={bestStreak}
      />

      <section className="mainGrid">
        {/* LEFT: habits */}
        <section>
          <h2>Active habits</h2>

          {loading && <Loading message="Loading habits..." />}
          {error && <ErrorMessage message={error} />}

          {!loading && habits.length > 0 && (
            <div className="habitsGrid">
              {habits.map((habit) => {
                const doneToday =
                  habit.completedDates?.includes(today) ?? false;

                const completedThisPeriod =
                  habit.frequencyType === "weekly"
                    ? getCompletedThisCalendarWeek(habit.completedDates ?? [])
                    : getCompletedLast7Days(habit.completedDates ?? []);

                return (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    completedThisWeek={completedThisPeriod}
                    isDoneToday={doneToday}
                    onComplete={() => markHabitDone(habit.id)}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* RIGHT: overview */}
        <aside className="overviewCard">
          <h2>Overview</h2>
          <DailyChallenge />
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;
