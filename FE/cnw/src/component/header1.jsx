import "./header.css";
import logo from "../logo.png";
import { Button,Select } from "antd";
import {  useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="header_login">
      <img src={logo} alt="logo" className="logo" />
      

      <div>
        <section className="select-lang">
        <Select defaultValue="vi" style={{ width: 120 }} options={[
          { value: 'vi', label: 'Tiếng Việt' },
          { value: 'en', label: 'English' },
        ]} />
      </section>
        <Button className="btn-login" onClick={handleSignUp}>
          Đăng Ký
        </Button>
      </div>
    </div>
  );
};

export default Header;