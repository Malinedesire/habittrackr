import { getBestStreak } from "../../utils/streak";

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
    <section
      style={{
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "1.5rem",
      }}
    >
      <h3>Streak information</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Stat label="Current streak" value={`${currentStreak} days`} />
        <Stat label="Best streak" value={`${bestStreak} days`} />
        <Stat label="Total days" value={completedDates.length} />
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div style={{ textAlign: "center" }}>
    <strong>{value}</strong>
    <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>{label}</div>
  </div>
);

export default HabitStreakInfo;