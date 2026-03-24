import { Card } from "antd";
import { useEffect, useState } from "react";
import { Column,Pie,Line } from "@ant-design/plots";

const AM_Report = () => {
  const [mostViewedMovies, setMostViewedMovies] = useState([]);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [signUpTrendsData, setSignUpTrends] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("most-viewed");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [mostViewedRes, mostActiveRes, signUpTrendsRes] = await Promise.all([
          fetch("http://localhost:5000/api/reports/most-viewed"),
          fetch("http://localhost:5000/api/reports/most-active"),
          fetch("http://localhost:5000/api/reports/sign-up-trends")
        ]);

        const mostViewedData = await mostViewedRes.json();
        const mostActiveData = await mostActiveRes.json();
        const signUpTrendsData = await signUpTrendsRes.json();


        setMostViewedMovies(mostViewedData);
        setMostActiveUsers(mostActiveData);
        setSignUpTrends(signUpTrendsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);

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
    }
  ];
  const topMovies = mostViewedMovies.slice(0, 10);
  const topUsers = mostActiveUsers.slice(0, 10);
  const signUpTrends = signUpTrendsData.slice(0, 10);

  const contentList = {
    "most-viewed": (
      <Column
        data={topMovies}
        xField="NameMovie"
        yField="Views"
      />
    ),
    "most-active": (
      <Column
        data={topUsers}
        xField="FullName"
        yField="Views"
      />
    ),
    "sign-up-trends": (
      <Line
        data={signUpTrends}
        xField="Thang"
        yField="SoLuongUser"
      />
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