import "./DataPrivacySection.css";

const DataPrivacySection = () => {
  return (
    <section className="dataPrivacySection">
      <h2>Data & Privacy</h2>

      <p className="description">
        Manage how your data is handled. More options will be available in the
        future.
      </p>
      <div className="actions">
        <button disabled>Export my data</button>
        <button disabled>Privacy settings</button>
      </div>
    </section>
  );
};

export default DataPrivacySection;