import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg"; // justera path vid behov
import "./PublicNavbar.css";

const PublicNavbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="publicNavbar">
      <Link to="/" className="publicLogo">
        <img src={Logo} alt="HabitTrackr logo" className="logoIcon" />
        <span>HabitTrackr</span>
      </Link>

      <nav className="publicNav">
        {pathname === "/login" && (
          <p className="navText">
            New here?{" "}
            <Link to="/register" className="authLink">
              Sign up
            </Link>
          </p>
        )}

        {pathname === "/register" && (
          <p className="navText">
            Already have an account?{" "}
            <Link to="/login" className="authLink">
              Log in
            </Link>
          </p>
        )}

        {pathname === "/" && (
          <>
            <Link to="/login" className="authLink">
              Log in
            </Link>
            <Link to="/register" className="authLink">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default PublicNavbar;