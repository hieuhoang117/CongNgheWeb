import "./ResetPass.css";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();



    // gửi OTP
    const sendOTP = async () => {
        if (!email) return message.error("Nhập email");

        const res = await fetch("http://localhost:5000/api/users/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            message.success("OTP đã gửi");
            setStep(2);
            setCountdown(60);
        }
    };
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // xác thực OTP
    const verifyOTP = async () => {
        const res = await fetch("http://localhost:5000/api/users/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (data.success) {
            message.success("Xác thực thành công");
            setStep(3);
        } else {
            message.error("OTP sai");
        }
    };

    // đổi mật khẩu
    const resetPassword = async () => {
        if (password !== confirmPassword) {
            return message.error("Mật khẩu không khớp");
        }

        const res = await fetch("http://localhost:5000/api/users/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword: password }),
        });

        const data = await res.json();

        if (data.success) {
            message.success("Đổi mật khẩu thành công");
            setStep(1);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setOtp("");
        } else {
            message.error("Không đổi được");
        }
    };

    return (
        <div className="resetpass">
            <button className="btnBacklogin" onClick={() => navigate("/")}>Quay lại</button>
            <div className="resetpass__container">


                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h2>Quên mật khẩu</h2>
                        <input
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={sendOTP}>
                            Gửi OTP
                        </button>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h2>Nhập OTP</h2>
                        <input
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={verifyOTP}>
                            Xác nhận OTP
                        </button>
                        <button
                            className="btnResend"
                            disabled={countdown > 0}
                            onClick={sendOTP}
                        >
                            {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi lại OTP"}
                        </button>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <h2>Đổi mật khẩu</h2>
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={resetPassword}>
                            Đổi mật khẩu
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default ResetPass;