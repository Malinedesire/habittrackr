import "./AppFooter.css";

const AppFooter = () => {
  return (
    <footer className="appFooter">
      <p>© {new Date().getFullYear()} HabitTrackr</p>
    </footer>
  );
};

export default AppFooter;