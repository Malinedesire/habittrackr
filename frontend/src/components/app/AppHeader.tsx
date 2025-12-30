import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./AppHeader.css";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="appHeader">
      <Link to="/dashboard" className="appLogo">
        HabitTrackr
      </Link>

      <div className="appHeaderActions">
        <Link to="/profile" className="headerLink">
          Profile
        </Link>

        <button onClick={handleLogout} className="headerButton">
          Sign out
        </button>
      </div>
    </header>
  );
};

export default AppHeader;