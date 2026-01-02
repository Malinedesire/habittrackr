import { Link } from "react-router-dom";
import "./DashboardHeader.css";


const DashboardHeader = () => {
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
    </header>
  );
};

export default DashboardHeader;