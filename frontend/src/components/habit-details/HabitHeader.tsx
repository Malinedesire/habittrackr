import type { Habit } from "../../types/habit";
import "./HabitHeader.css";

type Props = {
  habit: Habit;
  onEdit?: () => void;
  onDelete: () => void;
};

const HabitHeader = ({ habit, onEdit, onDelete }: Props) => {
  const totalCompleted = habit.completedDates?.length ?? 0;

  return (
    <section className="habitHeader">
      {/* Header top */}
      <div className="habitHeaderTop">
        <div className="habitHeaderText">
          <h1 className="habitTitle">{habit.title}</h1>

          {habit.description && (
            <p className="habitDescription">{habit.description}</p>
          )}

          <div className="habitBadges">
            <span className="badge">{habit.frequencyType}</span>
          </div>
        </div>

        <div className="habitActions">
          {onEdit && (
            <button
              onClick={onEdit}
              aria-label="Edit habit"
              className="iconButton edit"
            >
              ✏️
            </button>
          )}

          <button
            onClick={onDelete}
            aria-label="Delete habit"
            className="iconButton delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="habitStats">
        <div className="stat">
          <strong>{totalCompleted}</strong>
          <span>Total days</span>
        </div>

        <div className="stat">
          <strong>{totalCompleted}</strong>
          <span>Current streak</span>
        </div>

        <div className="stat">
          <strong>{totalCompleted}</strong>
          <span>Best streak</span>
        </div>
      </div>
    </section>
  );
};

export default HabitHeader;
