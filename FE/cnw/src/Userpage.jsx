import { Outlet } from "react-router-dom";
import USHeader from "./component/US_header";
import USFooter from "./component/US_footer";
import "./Userpage.css";

const UserPage = () => {
  return (
    <div className="page-container">

      <USHeader />

      <div className="content">
        <Outlet />
      </div>
      
      <USFooter />
    </div>
  );
};

export default UserPage;