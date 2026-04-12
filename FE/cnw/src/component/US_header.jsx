import logo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Input, Badge, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import NotificationItem from "./NotificationIterm";
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
    const [notifix, setNotifix] = useState([]);
    const navigate = useNavigate();
    const fetchNotifix = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/notifix/active");
            const data = await res.json();
            setNotifix(data || []);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchNotifix();
    }, []);

    const handleClickNoti = async (n) => {
        try {
            const res = await fetch(`http://localhost:5000/api/notifix/content/${n.ContentID}`);
            const data = await res.json();

            if (data.ContentType === "Movie") {
                navigate(`/user/movie/${data.IDmovie}`);
            } else if (data.ContentType === "Series") {
                navigate(`/user/series/${data.IDseries}`);
            }
        } catch (err) {
            console.error(err);
        }
    };
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
                <Link to="/user/menu_series" className="Link">Series</Link>
                <Link to="/user/menu_movie" className="Link">Phim</Link>
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

                    <Badge count={notifix.length} offset={[0, 10]}>
                        <Dropdown
                            dropdownRender={() => (
                                <div className="notification-dropdown">
                                    {notifix.length === 0 ? (
                                        <p style={{ padding: 20 }}>Không có thông báo nào</p>
                                    ) : (
                                        notifix.map((n) => (
                                            <NotificationItem
                                                key={n.NotificationID}
                                                notification={n}
                                                onClick={() => handleClickNoti(n)}
                                            />
                                        ))
                                    )}
                                </div>
                            )}
                            trigger={["click"]}
                        >
                            <button className="notification-button" style={{ background: "none", border: "none", padding: 0, color: "white" }}>
                                <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                            </button>
                        </Dropdown>
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