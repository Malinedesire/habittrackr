import type { Habit } from "../../types/habit";
import "./HabitHeader.css";

type Props = {
  habit: Habit;
  onEdit?: () => void;
  onDelete: () => void;
};

const HabitHeader = ({ habit, onEdit, onDelete }: Props) => {
  return (
    <section className="habitHeader">
      {/* Top row: title + actions */}
      <div className="topRow">
        <div>
          <h1 className="title">{habit.title}</h1>

          {habit.description && (
            <p className="description">{habit.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="actions">
          {onEdit && (
            <button
              onClick={onEdit}
              aria-label="Edit habit"
              className="iconButton"
            >
              ✏️
            </button>
          )}

          <button
            onClick={onDelete}
            aria-label="Delete habit"
            className="iconButton deleteButton"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="meta">
        <p>Frequency: {habit.frequencyType}</p>
        <p>Total completed: {habit.completedDates?.length ?? 0} days</p>
      </div>
    </section>
  );
};

export default HabitHeader;