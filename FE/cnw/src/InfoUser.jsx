import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import InfoHeader from "./component/Info_header";
import USFooter from "./component/US_footer";
import AnimatedOutlet from "./component/AnimatedOutlet";
import "./InfoUser.css";

const { Sider, Content } = Layout;

const InfoUser = () => {
    const navigate = useNavigate();

    return (
        <div>
            <InfoHeader />
            <Layout style={{ minHeight: "100vh", marginTop: "80px" }}>

                <Sider width={250} style={{ backgroundColor: "White" }}>
                    <Menu
                        theme="light"
                        mode="inline"
                        onClick={(e) => {
                            navigate(e.key);
                        }}
                        items={[
                            { key: "/info/info", label: "Thông tin cá nhân" },
                            { key: "/info/Security", label: "Bảo mật" },
                            { key: "/info/report", label: "Báo cáo" },
                            { key: "/info/contract", label: "Thỏa thuận và điều khoản" },
                        ]}
                    />
                </Sider>


                <Layout>
                    <Content style={{ margin: "16px" }}>
                        <AnimatedOutlet />
                    </Content>
                </Layout>

            </Layout>
            <USFooter />
        </div>

    );
};

export default InfoUser;