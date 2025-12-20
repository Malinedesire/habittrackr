import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main>
      {/* Header / Navigation */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2rem",
        }}
      >
        <strong>HabitTrackr</strong>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </nav>
      </header>

      {/* Hero section */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1>Stop planning. Start doing.</h1>

          <p style={{ marginTop: "1rem" }}>
            Build better habits, take on challenges, and track your progress —
            one day at a time.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Link to="/register">
              <button>Get started</button>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;