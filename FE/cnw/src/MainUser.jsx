import USHeader from "./component/US_header";
import USFooter from "./component/US_footer";
import AnimatedOutlet from "./component/AnimatedOutlet";
import "./MainUser.css";

const UserPage = () => {
  return (
    <div className="page-container">

      <USHeader />

      <div className="content" style={{ margin: "16px" }}>
        <AnimatedOutlet />
      </div>
      
      <USFooter />
    </div>
  );
};

export default UserPage;