import "./header.css";
import logo from "../logo.png";
import { Button,Select } from "antd";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      

      <div>
        <section className="select-lang">
        <Select defaultValue="vi" style={{ width: 120 }} options={[
          { value: 'vi', label: 'Tiếng Việt' },
          { value: 'en', label: 'English' },
        ]} />
      </section>
        <Button className="btn-login">Đăng nhập</Button>
      </div>
    </div>
  );
};

export default Header;