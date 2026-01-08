import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const { user, loading } = useUser();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) return null;

  return (
    <header className="dashboardHeader">
      <div className="dashboardHeaderTop">
        <div>
          <h1 className="dashboardTitle">
            {user?.name ? `Hello, ${user.name} 💜` : "Hello 👋"}
          </h1>
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