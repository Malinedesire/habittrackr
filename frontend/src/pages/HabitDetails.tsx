import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import type { Habit } from "../types/habit";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

import HabitHeader from "../components/habit-details/HabitHeader";
import CompletionHistory from "../components/habit-details/CompletionHistory";
import PlaceholderSection from "../components/habit-details/PlaceholderSection";

import "./HabitDetails.css";

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabit = async () => {
      const user = auth.currentUser;
      if (!user || !id) {
        setLoading(false);
        return;
      }

      try {
        const habitRef = doc(db, "users", user.uid, "habits", id);
        const snapshot = await getDoc(habitRef);

        if (!snapshot.exists()) {
          setError("Habit not found");
        } else {
          setHabit({
            id: snapshot.id,
            ...(snapshot.data() as Omit<Habit, "id">),
          });
        }
      } catch {
        setError("Failed to load habit");
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  const handleDeleteHabit = async () => {
    const user = auth.currentUser;
    if (!user || !id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this habit?"
    );

    if (!confirmed) return;

    try {
      const habitRef = doc(db, "users", user.uid, "habits", id);
      await deleteDoc(habitRef);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete habit", error);
      alert("Something went wrong while deleting the habit.");
    }
  };

  if (loading) return <Loading message="Loading habit..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!habit) return null;

  return (
    <main className="habit-details">
      <Link to="/dashboard" className="habit-details__back">
        ← Back to dashboard
      </Link>

      <HabitHeader
        habit={habit}
        onEdit={() => navigate(`/habits/${habit.id}/edit`)}
        onDelete={handleDeleteHabit}
      />

      <CompletionHistory completedDates={habit.completedDates} />

      <PlaceholderSection
        title="Recent activity"
        description="Recent habit activity will be shown here."
      />
    </main>
  );
};

export default HabitDetails;