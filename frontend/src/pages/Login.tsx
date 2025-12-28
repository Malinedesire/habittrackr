import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.code));
    }
  };

  return (
    <main className="login">
      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <h1 className="loginTitle">Log in</h1>

        <div className="formField">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="formField">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <button type="button" className="loginButton" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </main>
  );
};

export default Login;