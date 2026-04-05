import logo from "../logo.png";
import { Link } from "react-router-dom";
import { Input, Button, Badge, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./US_header.css";


const items = [
    { key: "1", label: "Người dùng 1" },
    { key: "2", label: "Người dùng 2" },
    { key: "3", label: "Quản lý hồ sơ" },
    { key: "4", label: "Trợ giúp" },
    { key: "5", label: "Đăng xuất" },
];
const USHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className={`header_user ${isScrolled ? "scrolled" : ""}`}>
            <img src={logo} alt="logo" className="logo" />
            <div className="menu">
                <Link to="/user/menu_main" className="Link">Trang chủ</Link>
                <Link to="/user/slide" className="Link">Series</Link>
                <Link to="/user/slide" className="Link">Phim</Link>
                <Link to="/user/movie/MV002" className="Link">Mới và phổ biến</Link>
                <Link to="/user/slide" className="Link">Danh sách của tôi</Link>
                <Link to="/user/slide" className="Link">Duyệt theo ngôn ngữ</Link>
            </div>
            <div className="account">
                <Space size="middle">

                    <Input
                        placeholder="Tìm kiếm..."
                        style={{ width: 200 }}
                    />

                    <Badge count={0}>
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            style={{ color: "white", fontSize: 20 }}
                        />
                    </Badge>

                    <Dropdown menu={{ items }}>
                        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                    </Dropdown>

                </Space>
            </div>


        </div>
    );
};

export default USHeader;