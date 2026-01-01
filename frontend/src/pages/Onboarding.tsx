import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
import "./Onboarding.css";

const Onboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState<string | null>(null);

  const goToDashboard = () => {
    // senare: spara name + focus i Firestore
    navigate("/dashboard");
  };

  return (
    <main className="onboarding">
      <div className="onboardingCard">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="onboardingQuestion">What should we call you?</p>
            <p className="onboardingHint">
              Don’t worry, you can change this later
            </p>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <div className="onboardingActions">
              <button
                className="primary"
                disabled={!name}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="onboardingQuestion">Quick question</p>
            <p className="onboardingHint">
              What are you hoping to improve right now?
            </p>

            <div className="onboardingOptions">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`option option--${category.color} ${
                    focus === category.id ? "selected" : ""
                  }`}
                  onClick={() => setFocus(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="onboardingActions">
              <button className="secondary" onClick={() => setStep(1)}>
                Back
              </button>

              <button
                className="primary"
                disabled={!focus}
                onClick={goToDashboard}
              >
                Go to dashboard →
              </button>
            </div>
          </>
        )}

        {/* Progress dots */}
        <div className="onboardingProgress">
          <span className={step === 1 ? "active" : ""} />
          <span className={step === 2 ? "active" : ""} />
        </div>
      </div>
    </main>
  );
};

export default Onboarding;
