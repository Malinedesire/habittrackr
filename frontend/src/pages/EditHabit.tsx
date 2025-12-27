import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

type FrequencyType = "daily" | "weekdays" | "weekends" | "flexible";

const EditHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [frequencyType, setFrequencyType] = useState<FrequencyType>("daily");
  const [targetPerPeriod, setTargetPerPeriod] = useState<number>(3);

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
        const ref = doc(db, "users", user.uid, "habits", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setError("Habit not found");
        } else {
          const data = snap.data();
          setTitle(data.title ?? "");
          setDescription(data.description ?? "");
          setFrequencyType(data.frequencyType ?? "daily");
          setTargetPerPeriod(data.targetPerPeriod ?? 3);
        }
      } catch {
        setError("Failed to load habit");
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !id) return;

    try {
      const ref = doc(db, "users", user.uid, "habits", id);

      await updateDoc(ref, {
        title,
        description,
        frequencyType,
        ...(frequencyType === "flexible" && {
          targetPerPeriod,
        }),
      });

      navigate(`/habits/${id}`);
    } catch {
      setError("Failed to save changes");
    }
  };

  if (loading) return <Loading message="Loading habit..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <Link to={`/habits/${id}`}>← Back</Link>

      <h1 style={{ marginTop: "1rem" }}>Edit habit</h1>

      <form onSubmit={handleSave} style={{ marginTop: "1.5rem" }}>
        {/* Title */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Frequency */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Frequency</label>
          <select
            value={frequencyType}
            onChange={(e) => setFrequencyType(e.target.value as FrequencyType)}
          >
            <option value="daily">Daily</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        {/* Flexible input */}
        {frequencyType === "flexible" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Times per week</label>
            <input
              type="number"
              min={1}
              max={7}
              value={targetPerPeriod}
              onChange={(e) => setTargetPerPeriod(Number(e.target.value))}
            />
          </div>
        )}

        <button type="submit">Save changes</button>
      </form>
    </main>
  );
};

export default EditHabit;