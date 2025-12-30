import { Outlet } from "react-router-dom";
import AppHeader from "../components/app/AppHeader";
import AppFooter from "../components/app/AppFooter";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main className="appLayout">
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
