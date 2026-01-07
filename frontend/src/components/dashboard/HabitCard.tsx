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
  const category = CATEGORIES.find((c) => c.id === habit.category);

  //STREAK
  const streakValue = habit.currentStreak ?? 0;
  const streakLabel =
    habit.frequencyType === "daily" ? "day streak" : "weekly streak";

  //PROGRESS
  const rawProgress =
    habit.frequencyType === "daily"
      ? completedThisWeek / 7
      : completedThisWeek / Math.max(habit.targetPerPeriod ?? 1, 1);

  const progressPercent = Math.min(Math.round(rawProgress * 100), 100);

  const isWeekly = habit.frequencyType === "weekly";
  const weeklyTarget = isWeekly ? habit.targetPerPeriod ?? 0 : 0;

  const hasMetWeeklyGoal =
    isWeekly && weeklyTarget > 0 && completedThisWeek >= weeklyTarget;

  const streakStatus =
    streakValue > 0 ? "active" : hasMetWeeklyGoal ? "pending" : "none";

  return (
    <div className={`habitCard ${isDoneToday ? "done" : ""}`}>
      {/* Top */}
      <div className="habitCardTop">
        <div className="habitCardTitle">
          <Link to={`/habits/${habit.id}`}>
            <h3>{habit.title}</h3>
          </Link>

          {/* Category */}
          {category && (
            <span
              className={`categoryChip categoryChip--${category.color} categoryChip--badge`}
            >
              {category.label}
            </span>
          )}
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

      {/* Meta */}
      <div className="habitMeta">
        {/* STREAK */}
        {streakStatus === "active" && (
          <span>
            🔥 {streakValue} {streakLabel}
          </span>
        )}

        {streakStatus === "pending" && (
          <span className="pendingStreak">⏳ Week goal completed</span>
        )}

        {streakStatus === "none" && (
          <span className="noStreak">🔥 No streak yet</span>
        )}

        {/* PROGRESS / GOAL */}
        {isWeekly ? (
          hasMetWeeklyGoal ? (
            <span className="goalMet">✓ Weekly goal met</span>
          ) : (
            <span>
              {completedThisWeek} / {weeklyTarget} this week
            </span>
          )
        ) : (
          <span>{progressPercent}% this week</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Footer */}
      <Link to={`/habits/${habit.id}`} className="detailsLink">
        Details →
      </Link>
    </div>
  );
};

export default HabitCard;
