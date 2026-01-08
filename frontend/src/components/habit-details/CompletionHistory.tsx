import "./CompletionHistory.css";

type Props = {
  completedDates?: string[];
};

const CompletionHistory = ({ completedDates }: Props) => {
  return (
    <section className="completionHistory">
      <h2>Recent Activity</h2>

      {completedDates && completedDates.length > 0 ? (
        <ul className="historyList">
          {[...completedDates].reverse().map((date) => (
            <li key={date} className="historyItem">
              <span className="historyIcon">✅</span>
              <span className="historyDate">{date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">No completions yet 🚀</p>
      )}
    </section>
  );
};

export default CompletionHistory;
