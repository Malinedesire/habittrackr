import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./CreateHabit.css";

type FrequencyType = "daily" | "weekdays" | "weekends" | "flexible";

const CreateHabit = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<FrequencyType>("daily");
  const [targetPerPeriod, setTargetPerPeriod] = useState<number>(3);
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "habits"), {
        title: name,
        description: note,
        frequencyType: frequency,
        targetPerPeriod: frequency === "flexible" ? targetPerPeriod : null,
        isActive: true,
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create habit", error);
    }
  };

  return (
    <main className="createHabit">
      <div className="intro">
        <h1>Create new habit</h1>
        <p>Set up a habit you want to build consistently.</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {/* Habit name */}
        <div className="field">
          <label>
            Habit name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Go to the gym"
              required
            />
          </label>
        </div>

        {/* Frequency */}
        <fieldset className="field radioGroup">
          <legend>Frequency</legend>

          <label>
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={frequency === "daily"}
              onChange={() => setFrequency("daily")}
            />
            Every day
          </label>

          <label>
            <input
              type="radio"
              name="frequency"
              value="weekdays"
              checked={frequency === "weekdays"}
              onChange={() => setFrequency("weekdays")}
            />
            Weekdays
          </label>

          <label>
            <input
              type="radio"
              name="frequency"
              value="weekends"
              checked={frequency === "weekends"}
              onChange={() => setFrequency("weekends")}
            />
            Weekends
          </label>

          <label>
            <input
              type="radio"
              name="frequency"
              value="flexible"
              checked={frequency === "flexible"}
              onChange={() => setFrequency("flexible")}
            />
            Flexible (X times per week)
          </label>
        </fieldset>

        {/* Flexible input */}
        {frequency === "flexible" && (
          <div className="flexibleInput">
            <label>
              Times per week
              <input
                type="number"
                min={1}
                max={7}
                value={targetPerPeriod}
                onChange={(e) => setTargetPerPeriod(Number(e.target.value))}
              />
            </label>
          </div>
        )}

        {/* Optional note */}
        <div className="field">
          <label>
            Why this habit matters (optional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a short note to motivate yourself"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="actions">
          <button type="submit">Create habit</button>
          <button type="button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateHabit;
