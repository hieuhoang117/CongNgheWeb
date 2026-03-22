import { Layout, Menu } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import logo from"./logo.png";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* MENU */}
      <Sider>
        <div style={{ color: "white", padding: 16 }}>
          <img src={logo} alt="Logo" style={{ width: 120, height: 80 }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => {
            navigate(e.key); // 👉 chuyển route
          }}
          items={[
            { key: "/admin/users", label: "Users" },
            { key: "/admin/movies", label: "Movies" },
          ]}
        />
      </Sider>

      {/* CONTENT */}
      <Layout>
        <Header style={{ color: "#fff" }}>
          Admin
        </Header>

        <Content style={{ margin: "16px" }}>
          <Outlet /> {/* 👉 nội dung sẽ thay đổi ở đây */}
        </Content>
      </Layout>

    </Layout>
  );
};

export default AdminPage;