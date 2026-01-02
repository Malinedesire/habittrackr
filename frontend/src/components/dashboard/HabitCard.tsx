import type { Habit } from "../../types/habit";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import "./HabitCard.css";

type Props = {
  habit: Habit;
  completedThisWeek: number;
  isDoneToday: boolean;
  onComplete: () => void;
};

const HabitCard = ({
  habit,
  completedThisWeek,
  isDoneToday,
  onComplete,
}: Props) => {
  const progressPercent = Math.round((completedThisWeek / 7) * 100);

  const category = CATEGORIES.find((c) => c.id === habit.category);

  return (
    <div className={`habitCard ${isDoneToday ? "done" : ""}`}>
      {/* Top */}
      <div className="habitCardTop">
        <div className="habitCardTitle">
          <Link to={`/habits/${habit.id}`}>
            <h3>{habit.title}</h3>
          </Link>
        </div>

        <button
          className={`checkButton ${isDoneToday ? "done" : ""}`}
          onClick={onComplete}
          disabled={isDoneToday}
          aria-label="Mark habit as done"
        >
          ✓
        </button>
      </div>

      <div>
        {category && (
          <span
            className={`categoryChip categoryChip--${category.color} categoryChip--badge`}
          >
            {category.label}
          </span>
        )}
      </div>
      
      {/* Meta */}
      <div className="habitMeta">
        <span>🔥 {completedThisWeek} day streak</span>
        <span>{progressPercent}% rate</span>
      </div>

      {/* Progress */}
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <Link to={`/habits/${habit.id}`} className="detailsLink">
        Details →
      </Link>
    </div>
  );
};

export default HabitCard;
