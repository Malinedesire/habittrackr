const Dashboard = () => {
  return (
    <main style={{ padding: "2rem" }}>
      {/* Page header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1>Welcome back!</h1>
        <p>Here’s an overview of your habits and progress.</p>
      </header>

      {/* Stats overview */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>Stats card</div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>Stats card</div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>Stats card</div>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>Stats card</div>
      </section>

      {/* Main content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Left column */}
        <div style={{ border: "1px dashed #ccc", padding: "1.5rem" }}>
          <h2>Active habits</h2>
          <p>Habit list will be displayed here.</p>
        </div>

        {/* Right column */}
        <aside style={{ border: "1px dashed #ccc", padding: "1.5rem" }}>
          <h2>Overview</h2>
          <p>Weekly overview, stats and motivation widgets.</p>
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;