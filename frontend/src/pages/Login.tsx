import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import { sendPasswordResetEmail } from "firebase/auth";
import { EyeIcon, EyeOffIcon } from "../icons/EyeIcons";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("onboardingCompleted", "true");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    setInfo(null);

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://habittrackr.vercel.app/login",
        handleCodeInApp: false,
      });

      setInfo(
        "We’ve sent you a reset link. After setting a new password, you’ll be redirected to log in ✉️"
      );
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.code));
    }
  };

  return (
    <main>
      <section className="login">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginIcon">🔒</div>

          <h1 className="loginTitle">Welcome back</h1>
          <p className="loginSubtitle">
            Sign in to continue building your habits
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
          {info && <p className="infoMessage">{info}</p>}

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Signing in..." : "Log in"}
          </button>

          <div className="forgotPassword">
            <button
              type="button"
              className="linkButton"
              onClick={handleResetPassword}
              disabled={!email}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;

