import { Link } from "react-router-dom";
import "./DashboardHeader.css";

type Props = {
  onLogout: () => void;
};

const DashboardHeader = ({ onLogout }: Props) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="dashboardHeader">
      <div className="dashboardHeaderTop">
        <div>
          <h1 className="dashboardTitle">My Habits</h1>
          <p className="dashboardDate">{today}</p>
        </div>

        <Link to="/habits/new" className="newHabitButton">
          + New Habit
        </Link>
      </div>

      <div className="dashboardHeaderActions">
        <Link to="/profile">
          <button className="secondaryButton">Profile</button>
        </Link>

        <button className="secondaryButton" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;