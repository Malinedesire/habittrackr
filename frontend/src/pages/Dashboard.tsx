import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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

const today = new Date().toISOString().split("T")[0];

const getCompletedThisWeek = (dates: string[] = []) => {
  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 6);

  return dates.filter((date) => {
    const d = new Date(date);
    return d >= last7Days && d <= today;
  }).length;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

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
    <main className="appLayout">
      <DashboardHeader onLogout={handleLogout}/>

      <section className="statsGrid">
        <div className="statsCard">
          <span className="statLabel">Total habits</span>
          <strong>{habits.length}</strong>
        </div>

        <div className="statsCard">
          <span className="statLabel">Completed today</span>
          <strong>
            {habits.filter((h) => h.completedDates?.includes(today)).length}
          </strong>
        </div>

        <div className="statsCard">
          <span className="statLabel">This week</span>
          <strong>
            {
              habits.filter(
                (h) => getCompletedThisWeek(h.completedDates ?? []) > 0
              ).length
            }
          </strong>
        </div>

        <div className="statsCard">
          <span className="statLabel">Consistency</span>
          <strong>—</strong>
        </div>
      </section>

      <Link to="/habits/new">
        <button>+ New habit</button>
      </Link>

      <section className="mainGrid">
        <div className="habitsCard">
          <h2>Active habits</h2>

          {loading && <Loading message="Loading habits..." />}
          {error && <ErrorMessage message={error} />}

          {!loading && habits.length === 0 && (
            <p>You haven’t created any habits yet.</p>
          )}

          {!loading && habits.length > 0 && (
            <ul>
              {habits.map((habit) => {
                const doneToday = habit.completedDates?.includes(today);
                const completedThisWeek = getCompletedThisWeek(
                  habit.completedDates ?? []
                );
                const progressPercent = Math.round(
                  (completedThisWeek / 7) * 100
                );

                return (
                  <li key={habit.id} className="habitItem">
                    <div className="activeHabits">
                      <div className="habitInfo">
                        <Link to={`/habits/${habit.id}`}>
                          <strong className="habitTitle">{habit.title}</strong>
                        </Link>
                        <span className="habitMeta">
                          {completedThisWeek} / 7 days this week
                        </span>
                      </div>

                      <button
                        onClick={() => markHabitDone(habit.id)}
                        disabled={doneToday}
                        className={`checkButton ${doneToday ? "done" : ""}`}
                        aria-label="Mark habit as done"
                      >
                        ✓
                      </button>
                    </div>

                    <div className="progressText">
                      {completedThisWeek} / 7 days this week
                    </div>

                    <div className="progressBar">
                      <div
                        className="progressFill"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="overviewCard">
          <h2>Overview</h2>
          <p>Weekly overview, stats and motivation widgets.</p>
          <DailyChallenge />
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;
