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
      } catch (error) {
        console.error("Error fetching habits:", error);
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

    try {
      const habitRef = doc(db, "users", user.uid, "habits", habitId);

      await updateDoc(habitRef, {
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
    } catch (error) {
      console.error("Failed to mark habit as done", error);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Welcome back!</h1>
        <p>Here’s an overview of your habits and progress.</p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Link to="/profile">
            <button>Profile settings</button>
          </Link>

          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>

      {/* Stats overview */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          Stats card
        </div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          Stats card
        </div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          Stats card
        </div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          Stats card
        </div>
      </section>

      <Link to="/habits/new">
        <button>+ New habit</button>
      </Link>

      {/* Main content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Left column */}
        <div style={{ border: "1px dashed #ccc", padding: "1.5rem" }}>
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
                  <li
                    key={habit.id}
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Title row with check icon */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link to={`/habits/${habit.id}`}>
                        <strong style={{ cursor: "pointer" }}>
                          {habit.title}
                        </strong>
                      </Link>

                      <button
                        onClick={() => markHabitDone(habit.id)}
                        disabled={doneToday}
                        aria-label="Mark habit as done"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: "1px solid #4caf50",
                          background: doneToday ? "#4caf50" : "transparent",
                          color: doneToday ? "#000" : "#4caf50",
                          cursor: doneToday ? "default" : "pointer",
                          fontWeight: "bold",
                          lineHeight: 1,
                        }}
                      >
                        {doneToday ? "✓" : ""}
                      </button>
                    </div>

                    {/* Progress text */}
                    <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      {completedThisWeek} / 7 days this week
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        height: "6px",
                        background: "#333",
                        borderRadius: "4px",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          width: `${progressPercent}%`,
                          height: "100%",
                          background: "#4caf50",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right column */}
        <aside style={{ border: "1px dashed #ccc", padding: "1.5rem" }}>
          <h2>Overview</h2>
          <p>Weekly overview, stats and motivation widgets.</p>
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;
