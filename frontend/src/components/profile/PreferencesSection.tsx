const PreferencesSection = () => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>Preferences</h2>

      <label style={{ display: "block", opacity: 0.6 }}>
        <input type="checkbox" disabled /> Notifications
        <span style={{ fontSize: "0.8rem", marginLeft: "0.5rem" }}>
          (coming soon)
        </span>
      </label>

      <br />

      <label style={{ display: "block", opacity: 0.6 }}>
        <input type="checkbox" disabled /> Dark mode
        <span style={{ fontSize: "0.8rem", marginLeft: "0.5rem" }}>
          (coming soon)
        </span>
      </label>
    </section>
  );
};

export default PreferencesSection;
