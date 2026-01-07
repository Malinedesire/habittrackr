import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { CATEGORIES } from "../constants/categories";
import "./CreateHabit.css";

type FrequencyType = "daily" | "weekly";

const CreateHabit = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<FrequencyType>("daily");
  const [targetPerPeriod, setTargetPerPeriod] = useState<number>(3);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<
    (typeof CATEGORIES)[number]["id"] | null
  >(null);

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
        targetPerPeriod: frequency === "weekly" ? targetPerPeriod : null,
        category,
        isActive: true,
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create habit", error);
    }
  };

  return (
    <main>
      <section className="createHabit">
        <div className="createHabitCard">
          <div className="intro">
            <h1>Create new habit</h1>
            <p>Build a better you, one habit at a time.</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {/* Habit name */}
            <div className="field">
              <label>
                <p className="fieldLabel">What do you want to do?</p>
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
            <div className="field">
              <p className="fieldLabel">How often?</p>

              <div className="frequencyOptions">
                <button
                  type="button"
                  className={`option ${frequency === "daily" ? "active" : ""}`}
                  onClick={() => setFrequency("daily")}
                >
                  Every day
                </button>

                <button
                  type="button"
                  className={`option ${frequency === "weekly" ? "active" : ""}`}
                  onClick={() => setFrequency("weekly")}
                >
                  Pick number of times per week
                </button>
              </div>
            </div>

            {/* Flexible input */}
            {frequency === "weekly" && (
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

            <div className="field">
              <p className="fieldLabel">Category (optional)</p>

              <div className="categoryOptions">
                {CATEGORIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`categoryChip categoryChip--${item.color} ${
                      category === item.id ? "active" : ""
                    }`}
                    onClick={() =>
                      setCategory(category === item.id ? null : item.id)
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

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
        </div>
      </section>
    </main>
  );
};

export default CreateHabit;
