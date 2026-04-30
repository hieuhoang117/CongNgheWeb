import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import InfoHeader from "./component/Info_header";
import USFooter from "./component/US_footer";
import "./InfoUser.css";

const { Sider, Content } = Layout;

const InfoUser = () => {
    const navigate = useNavigate();

    return (
        <div>
            <InfoHeader />
            <Layout style={{ minHeight: "100vh",marginTop:"70px" }}>

                <Sider width={250} style={{backgroundColor:"White"}}>
                    <Menu
                        theme="light"
                        mode="inline"
                        onClick={(e) => {
                            navigate(e.key);
                        }}
                        items={[
                            { key: "/info/info", label: "Quản lý thông tin cá nhân" },
                            { key: "/admin/movies", label: "Quản lý phim ngắn" },
                            { key: "/admin/series", label: "Quản lý phim bộ" },
                        ]}
                    />
                </Sider>


                <Layout>
                    <Content style={{ margin: "16px" }}>
                        <Outlet />
                    </Content>
                </Layout>

            </Layout>
            <USFooter />
        </div>

    );
};

export default InfoUser;