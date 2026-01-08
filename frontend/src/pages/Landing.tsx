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
              <button className="primaryCta">Get started →</button>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="howItWorks">
        <div className="howItWorksHeader">
          <h2>How it works</h2>
          <p>Three simple steps to building better habits</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="stepNumber">1</div>
            <h3>Pick your habits</h3>
            <p>
              Choose what you want to work on. Daily habits, weekly goals, or
              challenges - you decide.
            </p>
          </div>

          <div className="step">
            <div className="stepNumber">2</div>
            <h3>Track your progress</h3>
            <p>
              Check in daily. We handle the math, calculate streaks, and show
              how far you’ve come.
            </p>
          </div>

          <div className="step">
            <div className="stepNumber">3</div>
            <h3>Watch yourself grow</h3>
            <p>
              See your stats improve, hit milestones, and build momentum that
              keeps you going.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to build better habits?</h2>

        <p>Join thousands of people who are already making progress</p>

        <Link to="/register">
          <button className="ctaButton">Start tracking today →</button>
        </Link>

        <span className="ctaNote">Free forever · No credit card needed</span>
      </section>
    </main>
  );
};

export default Landing;
