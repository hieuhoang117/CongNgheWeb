import "./ResetPass.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    return (
        <div className="resetpass">
            <div className="resetpass__container">
                <h1 className="resetpass__title">Nhập email để lấy lại mật khẩu</h1>
                <input
                    type="email"
                    className="resetpass__input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="resetpass__button"
                    onClick={() => navigate(`/reset-password/${email}`)}
                >
                    Lấy lại mật khẩu
                </button>
            </div>
        </div>
    )
}

export default ResetPass