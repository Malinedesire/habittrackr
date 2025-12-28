import "./CompletionHistory.css";

type Props = {
  completedDates?: string[];
};

const CompletionHistory = ({ completedDates }: Props) => {
  return (
    <section className="completionHistory">
      <h2>Completion history</h2>

      {completedDates && completedDates.length > 0 ? (
        <ul className="list">
          {[...completedDates].reverse().map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      ) : (
        <p className="empty">No completions yet.</p>
      )}
    </section>
  );
};

export default CompletionHistory;