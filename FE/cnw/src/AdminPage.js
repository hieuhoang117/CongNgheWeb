import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider>
        <div style={{ color: "white", padding: 16 }}>
          <img src={logo} alt="Logo" style={{ width: 150, height: 100 }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <UserOutlined />, label: "Users" },
            { key: "2", icon: <VideoCameraOutlined />, label: "Movies" },
            { key: "3", icon: <UploadOutlined />, label: "Upload" },
          ]}
        />
      </Sider>

      {/* Main */}
      <Layout>
        <Header style={{ color: "#fff" }}>
          Trang quản trị
        </Header>

        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff" }}>
            Nội dung ở đây
          </div>
        </Content>
      </Layout>

    </Layout>
  );
};

export default AdminPage;