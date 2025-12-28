import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AccountActions.css";

const AccountActions = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <section className="accountActions">
      <button onClick={handleLogout}>Log out</button>

      <button disabled className="deleteButton">
        Delete account
      </button>
    </section>
  );
};

export default AccountActions;