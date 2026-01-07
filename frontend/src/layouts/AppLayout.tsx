import { Outlet } from "react-router-dom";
import AppHeader from "../components/app/AppHeader";
import AppFooter from "../components/app/AppFooter";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <div className="pageBg">
        <main className="appLayout">
          <Outlet />
        </main>
      </div>
      <AppFooter />
    </>
  );
};

export default AppLayout;
