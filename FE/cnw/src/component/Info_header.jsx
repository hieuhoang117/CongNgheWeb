import logo from "../logo.png";
import { useNavigate } from "react-router-dom";
import {  Dropdown, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./Info_header.css";


const InfoHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [userInfo, setUserInfo] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) return;

                const res = await fetch(`http://localhost:5000/api/users/id/${userId}`);
                const data = await res.json();
                setUserInfo(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const items = [
        {
            key: "1",
            label: <span>{userInfo?.FullName || "User"}</span>,
        },
        {
            key: "2",
            label: <span onClick={() => navigate("/info")}>Trang cá nhân</span>,
        },
        {
            key: "2",
            label: <span onClick={() => logout()}>Đăng xuất</span>,
        },
    ];

    return (
        <div className={`info-header_user ${isScrolled ? "scrolled" : ""}`}>
            <img src={logo} alt="logo" className="logo"
                onClick={() => navigate("/user/menu_main")}
                style={{ cursor: "pointer" }} />
           
            <div className="account">
                <Space size="middle">

                    <Dropdown menu={{ items }}>
                        <Avatar
                            icon={<UserOutlined />}
                            style={{ cursor: "pointer" }}
                        />
                    </Dropdown>

                </Space>
            </div>


        </div>
    );
};

export default InfoHeader;