import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <main className="landing">
      {/* Header / Navigation */}
      <header className="landingHeader">
        <strong className="logo">HabitTrackr</strong>

        <nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </nav>
      </header>

      {/* Hero section */}
      <section className="hero">
        <div className="heroContent">
          <h1>Stop planning. Start doing.</h1>

          <p className="heroText">
            Build better habits, take on challenges, and track your progress —
            one day at a time.
          </p>

          <div className="heroActions">
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