import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider>
        <div style={{ color: "white", padding: 16 }}>ADMIN</div>
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