import { useState } from "react";
import type { Habit } from "../../types/habit";
import { CATEGORIES } from "../../constants/categories";
import "./HabitActions.css";

type Props = {
  habit: Habit;
  onUpdate: (updates: Partial<Habit>) => Promise<void>;
  onDelete: () => void;
};

const HabitActions = ({ habit, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description ?? "");
  const [category, setCategory] = useState(habit.category);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await onUpdate({ title, description, category });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="habitActions">
      {/* Edit toggle */}
      <button
        className="primaryAction"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? "Close" : "Edit habit"}
      </button>

      {/* Edit section */}
      {isEditing && (
        <div className="editHabit">
          <div className="editField">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="editField">
            <label>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="editField">
            <label>Category</label>
            <div className="categoryOptions">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`categoryChip categoryChip--${cat.color} ${
                    category === cat.id ? "active" : ""
                  }`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="editActions">
            <button
              className="primaryAction"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>

            <button
              className="secondaryAction"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete */}
      <button className="dangerAction" onClick={onDelete}>
        Delete habit
      </button>
    </section>
  );
};

export default HabitActions;
