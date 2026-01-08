import type { Habit } from "../../types/habit";
import { CATEGORIES } from "../../constants/categories";
import "./HabitHeader.css";

type Props = {
  habit: Habit;
  onEdit?: () => void;
  onDelete: () => void;
};

const HabitHeader = ({ habit }: Props) => {
  const totalCompleted = habit.completedDates?.length ?? 0;

  const category = CATEGORIES.find((c) => c.id === habit.category);

  return (
    <section className="habitHeader">
      <div className="habitHeaderCard">
        <div className="habitTopRow">
          <div className="habitInfo">
            <strong className="habitTitle">{habit.title}</strong>

            {habit.description && (
              <div className="subText">{habit.description}</div>
            )}

            <div className="habitBadges">
              <span className="habitBadge">{habit.frequencyType}</span>

              {category && (
                <span className={`habitBadge habitBadge--${category.color}`}>
                  {category.label}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="habitStats">
          <Stat label="total days" value={totalCompleted} />
          <Stat label="current streak" value={totalCompleted} />
          <Stat label="best streak" value={totalCompleted} />
        </div>
      </div>
    </section>
  );
};

export default HabitHeader;

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="stat">
    <strong>{value}</strong>
    <span className="statLabel">{label}</span>
  </div>
);
