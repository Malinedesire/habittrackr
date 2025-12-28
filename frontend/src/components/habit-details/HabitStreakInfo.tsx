import { getBestStreak } from "../../utils/streak";
import "./HabitStreakInfo.css";

type Props = {
  completedDates?: string[];
};

const HabitStreakInfo = ({ completedDates = [] }: Props) => {
  const bestStreak = getBestStreak(completedDates);

  const currentStreak = (() => {
    if (completedDates.length === 0) return 0;

    const sorted = [...completedDates].sort().reverse();
    let streak = 1;

    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);

      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) streak++;
      else break;
    }

    return streak;
  })();

  return (
    <section className="habitStreakInfo">
      <h3>Streak information</h3>

      <div className="stats">
        <Stat label="Current streak" value={`${currentStreak} days`} />
        <Stat label="Best streak" value={`${bestStreak} days`} />
        <Stat label="Total days" value={completedDates.length} />
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="stat">
    <strong>{value}</strong>
    <div className="statLabel">{label}</div>
  </div>
);

export default HabitStreakInfo;