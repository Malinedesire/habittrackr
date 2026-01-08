import "./DashboardStats.css";

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
    <strong className="dashboardStatsValue">{value}</strong>
    <span className="dashBoardStatLabel">{label}</span>
  </div>
);

export default DashboardStats;
