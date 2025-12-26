const DataPrivacySection = () => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>Data & Privacy</h2>

      <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "1rem" }}>
        Manage how your data is handled. More options will be available in the
        future.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <button disabled>Export my data</button>
        <button disabled>Privacy settings</button>
      </div>
    </section>
  );
};

export default DataPrivacySection;