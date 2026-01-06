type Props = {
  habitCount: number;
  completedToday: number;
  activeThisWeek: number;
  bestStreak: number;
};

const DashboardStats = ({
  habitCount,
  completedToday,
  activeThisWeek,
  bestStreak,
}: Props) => {
  return (
    <section className="statsGrid">
      <Stat label="Total habits" value={habitCount} />
      <Stat label="Completed today" value={completedToday} />
      <Stat label="Active this week" value={activeThisWeek} />
      <Stat
        label="Best streak"
        value={bestStreak > 0 ? `🔥 ${bestStreak}` : "Calculating…"}
      />
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="statsCard">
    <span className="statLabel">{label}</span>
    <strong>{value}</strong>
  </div>
);

export default DashboardStats;
