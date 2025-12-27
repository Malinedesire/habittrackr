import "./PreferencesSection.css";

const PreferencesSection = () => {
  return (
    <section className="preferencesSection">
      <h2>Preferences</h2>

      <label className="preferenceItem">
        <input type="checkbox" disabled /> Notifications
        <span className="comingSoon">(coming soon)</span>
      </label>

      <br />

      <label className="preferenceItem">
        <input type="checkbox" disabled /> Dark mode
        <span className="comingSoon">(coming soon)</span>
      </label>
    </section>
  );
};

export default PreferencesSection;