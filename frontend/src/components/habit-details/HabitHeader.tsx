import type { Habit } from "../../types/habit";

type Props = {
  habit: Habit;
  onEdit?: () => void;
  onDelete: () => void;
};

const HabitHeader = ({ habit, onEdit, onDelete }: Props) => {
  return (
    <section
      style={{
        border: "1px solid #333",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem",
      }}
    >
      {/* Top row: title + actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "0.25rem" }}>{habit.title}</h1>

          {habit.description && (
            <p style={{ opacity: 0.8 }}>{habit.description}</p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={onEdit}
            aria-label="Edit habit"
            style={iconButtonStyle}
          >
            ✏️
          </button>

          <button
            onClick={onDelete}
            aria-label="Delete habit"
            style={{ ...iconButtonStyle, color: "#ff5252" }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.7 }}>
        <p>Frequency: {habit.frequencyType}</p>
        <p>Total completed: {habit.completedDates?.length ?? 0} days</p>
      </div>
    </section>
  );
};

const iconButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid #333",
  borderRadius: "6px",
  padding: "0.4rem 0.5rem",
  cursor: "pointer",
  fontSize: "1rem",
};

export default HabitHeader;
