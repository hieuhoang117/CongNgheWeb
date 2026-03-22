import "./banner.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // ✅ đúng chỗ

  const handleClick = async () => {
    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }

    const res = await fetch("http://localhost:5000/api/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!data.exists) {
      alert("❌ Email chưa đăng ký");
      return;
    }

    if (data.role === "Admin") {
      navigate("/admin"); // 👉 chuyển trang
      return;
    }

    alert("✅ Email hợp lệ");
  };

  return (
    <div className="banner">
      <div className="content">
        <h1>Phim, series không giới hạn</h1>
        <p>Giá từ 74.000đ</p>
        <p>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.
        </p>

        <div className="form">
          <input
            placeholder="Địa chỉ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn-start" onClick={handleClick}>
            Bắt đầu &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;