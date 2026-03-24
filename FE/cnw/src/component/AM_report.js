import { Card, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { Column, Area, Bar } from "@ant-design/plots";

const AM_Report = () => {
  const [mostViewedMovies, setMostViewedMovies] = useState([]);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [bugReports, setBugReports] = useState([]);
  const [signUpTrendsData, setSignUpTrends] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("most-viewed");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [mostViewedRes, mostActiveRes, signUpTrendsRes, bugReportsRes] = await Promise.all([
          fetch("http://localhost:5000/api/reports/most-viewed"),
          fetch("http://localhost:5000/api/reports/most-active"),
          fetch("http://localhost:5000/api/reports/sign-up-trends"),
          fetch("http://localhost:5000/api/reports/bug-reports")
        ]);

        const mostViewedData = await mostViewedRes.json();
        const mostActiveData = await mostActiveRes.json();
        const signUpTrendsData = await signUpTrendsRes.json();
        const bugReportsData = await bugReportsRes.json();


        setMostViewedMovies(mostViewedData);
        setMostActiveUsers(mostActiveData);
        setSignUpTrends(signUpTrendsData);
        setBugReports(bugReportsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);
  const handleUpdateStatus = async (bugID, currentStatus) => {
    try {
      const newStatus =
        currentStatus?.trim().toLowerCase() === "processing"
          ? "Fixed"
          : "Processing";
      await fetch(`http://localhost:5000/api/reports/bug-reports/${bugID}/fix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: newStatus })
      });
      setBugReports(prevReports =>
        prevReports.map(report =>
          report.BugID === bugID ? { ...report, Status: newStatus } : report
        )
      );
    } catch (err) {
      console.error("Error updating bug report status:", err);
    }
  };

  const tabList = [
    {
      key: "most-viewed",
      tab: "Phim được xem nhiều nhất"
    },
    {
      key: "most-active",
      tab: "Người dùng hoạt động nhiều nhất"
    },
    {
      key: "sign-up-trends",
      tab: "Xu hướng đăng ký"
    },
    {
      key: "bug-reports",
      tab: "Báo cáo lỗi"
    }
  ];
  const topMovies = mostViewedMovies.slice(0, 10);
  const topUsers = mostActiveUsers.slice(0, 10);
  const signUpTrends = signUpTrendsData.slice(0, 10);

  const columns = [
    { title: "ID", dataIndex: "BugID" },
    { title: "ID người dùng", dataIndex: "UserID" },
    { title: "ID nội dung", dataIndex: "ContentID" },
    { title: "Tiêu đề", dataIndex: "Title" },
    { title: "Mô tả", dataIndex: "Description" },
    { title: "Loại lỗi", dataIndex: "BugType" },
    { title: "Trạng thái", dataIndex: "Status" },
    { title: "Ngày tạo", dataIndex: "CreatedAt" },
    { title: "Ngày cập nhật", dataIndex: "UpdatedAt" },
    {
      title: "Hành động",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdateStatus(record.BugID, record.Status)}>
          {record.Status === "Processing" ? "Đánh dấu đã sửa" : "Đánh dấu đang xử lý"}
        </Button>
      )
    }
  ];
  const columnsMostViewed = [
    { title: "ID", dataIndex: "IDmovie" },
    { title: "Tên phim", dataIndex: "NameMovie" },
    { title: "Lượt xem", dataIndex: "Views" },
    { title: "Tổng thời gian xem (phút)", dataIndex: "TotalWatchTime" }
  ];

  const contentList = {
    "most-viewed": (
      <div>
        <Bar
          data={topMovies}
          xField="NameMovie"
          yField="Views"
        />
        <h1 style={{ textAlign: "center", marginTop: 20 }}>Phim mới nổi</h1>
        <Table columns={columnsMostViewed} dataSource={topMovies} rowKey="IDmovie" pagination={{ pageSize: 5 }} />
      </div>
    ),
    "most-active": (
      <div>
        <Column
          data={topUsers}
          xField="FullName"
          yField="Views"
        />
        <h1 style={{ textAlign: "center", marginTop: 20 }}>Người dùng hoạt động nhiều nhất</h1>
      </div>
    ),
    "sign-up-trends": (
      <Area
        data={signUpTrends}
        xField="Thang"
        yField="SoLuongUser"
      />
    ),
    "bug-reports": (
      <Table columns={columns} dataSource={bugReports} rowKey="BugID" pagination={{ pageSize: 5 }} />
    )
  };

  return (
    <div>
      <Card
        style={{ width: "100%" }}
        title="Báo cáo"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => setActiveTabKey(key)}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};

export default AM_Report;