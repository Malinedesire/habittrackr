import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <div className="pageBg">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
