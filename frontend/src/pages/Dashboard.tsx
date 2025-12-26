import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { Habit } from "../types/habit";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

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

  return (
    <main style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Welcome back!</h1>
        <p>Here’s an overview of your habits and progress.</p>

        {/* Logout */}
        <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
          Log out
        </button>
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
              {habits.map((habit) => (
                <li key={habit.id}>{habit.title}</li>
              ))}
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
