import { Outlet } from "react-router-dom";
import InfoHeader from "./component/Info_header";
import USFooter from "./component/US_footer";
import "./InfoUser.css";

const InfoUser = () => {
    return (
        <div className="page-container-info">

            <InfoHeader />

            <div className="content" style={{ margin: "70px" }}>
                <Outlet />
            </div>

            <USFooter />
        </div>
    );
};

export default InfoUser;