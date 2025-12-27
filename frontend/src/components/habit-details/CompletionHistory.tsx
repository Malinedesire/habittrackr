type Props = {
  completedDates?: string[];
};

const CompletionHistory = ({ completedDates }: Props) => {
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Completion history</h2>

      {completedDates && completedDates.length > 0 ? (
        <ul style={{ marginTop: "0.5rem" }}>
          {[...completedDates].reverse().map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      ) : (
        <p style={{ opacity: 0.7 }}>No completions yet.</p>
      )}
    </section>
  );
};

export default CompletionHistory;