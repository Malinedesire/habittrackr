import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <main>
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