import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AccountActions = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <section style={{ marginTop: "3rem" }}>
      <button onClick={handleLogout}>Log out</button>

      <button disabled style={{ marginTop: "1rem", color: "red" }}>
        Delete account
      </button>
    </section>
  );
};

export default AccountActions;