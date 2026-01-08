import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { EyeIcon, EyeOffIcon } from "../icons/EyeIcons";

import "./Login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, "users", uid), {
        createdAt: serverTimestamp(),
      });

      localStorage.removeItem("onboardingCompleted");
      navigate("/onboarding");
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="login">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginIcon">✔</div>

          <h1 className="loginTitle">Create account</h1>
          <p className="loginSubtitle">
            Start building habits that actually stick
          </p>

          <div className="formField">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formField passwordField">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="togglePassword"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {error && <p className="errorMessage">{error}</p>}

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
