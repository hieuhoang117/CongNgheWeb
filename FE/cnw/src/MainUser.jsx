import { Outlet } from "react-router-dom";
import USHeader from "./component/US_header";
import USFooter from "./component/US_footer";
import USslide from "./component/US_slide";
import "./MainUser.css";

const UserPage = () => {
  return (
    <div className="page-container">

      <USHeader />

      <div className="content" style={{ margin: "16px" }}>
        <Outlet />
      </div>
      
      <USFooter />
    </div>
  );
};

export default UserPage;