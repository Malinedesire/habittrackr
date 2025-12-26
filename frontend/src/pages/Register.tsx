import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err);
      console.log(err.code);
      setError(getAuthErrorMessage(err.code));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create account</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Sign up</button>
    </form>
  );
};

export default Register;
