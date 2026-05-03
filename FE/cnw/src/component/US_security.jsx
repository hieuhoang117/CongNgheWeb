import { Card, Input, Button, message } from "antd";
import userStore from "../store/useUserStore";
import { useState, useEffect } from "react";

const USsecurity = () => {
    const [activeTabKey, setActiveTabKey] = useState("1");

    const userId = userStore((state) => state.userId);

    // ===== CHANGE PASSWORD =====
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ===== CHANGE EMAIL =====
    const [newEmail, setNewEmail] = useState("");
    const [otpEmail, setOtpEmail] = useState("");
    const [stepEmail, setStepEmail] = useState(1);
    const [countdownEmail, setCountdownEmail] = useState(0);

    // ===== FORGOT PASSWORD =====
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [stepForgot, setStepForgot] = useState(1);
    const [countdownForgot, setCountdownForgot] = useState(0);

    // ===== COUNTDOWN =====
    useEffect(() => {
        if (countdownEmail > 0) {
            const t = setTimeout(() => setCountdownEmail(countdownEmail - 1), 1000);
            return () => clearTimeout(t);
        }
    }, [countdownEmail]);

    useEffect(() => {
        if (countdownForgot > 0) {
            const t = setTimeout(() => setCountdownForgot(countdownForgot - 1), 1000);
            return () => clearTimeout(t);
        }
    }, [countdownForgot]);

    // ===== API =====

    const handleCheckEmail = async (emailCheck) => {
        const res = await fetch("http://localhost:5000/api/users/check-email-new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailCheck }),
        });
        const data = await res.json();
        return data.exists;
    };

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            return message.error("Mật khẩu không khớp");
        }

        const res = await fetch(`http://localhost:5000/api/users/change-password/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldPassword, newPassword: password }),
        });

        const data = await res.json();

        if (data.success) {
            message.success("Đổi mật khẩu thành công");
        } else {
            message.error("Mật khẩu cũ không đúng");
        }
    };

    // ===== CHANGE EMAIL =====
    const sendOTPEmail = async () => {
        if (!newEmail) return message.error("Nhập email");

        const exists = await handleCheckEmail(newEmail);
        if (exists) return message.error("Email đã tồn tại");

        const res = await fetch("http://localhost:5000/api/users/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newEmail }),
        });

        if (res.ok) {
            message.success("OTP đã gửi");
            setStepEmail(2);
            setCountdownEmail(60);
        }
    };

    const verifyOTPEmail = async () => {
        const res = await fetch("http://localhost:5000/api/users/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newEmail, otp: otpEmail }),
        });

        const data = await res.json();

        if (!data.success) return message.error("OTP sai");

        await fetch(`http://localhost:5000/api/users/change-email/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newEmail }),
        });

        message.success("Đổi email thành công");
        setStepEmail(1);
        setNewEmail("");
        setOtpEmail("");
    };

    // ===== FORGOT PASSWORD =====
    const sendOTPForgot = async () => {
        if (!email) return message.error("Nhập email");

        const res = await fetch("http://localhost:5000/api/users/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            message.success("OTP đã gửi");
            setStepForgot(2);
            setCountdownForgot(60);
        }
    };

    const verifyOTPForgot = async () => {
        const res = await fetch("http://localhost:5000/api/users/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (data.success) {
            message.success("Xác thực thành công");
            setStepForgot(3);
        } else {
            message.error("OTP sai");
        }
    };

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            return message.error("Mật khẩu không khớp");
        }

        const res = await fetch(`http://localhost:5000/api/users/reset-password/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword: password }),
        });

        const data = await res.json();

        if (data.success) {
            message.success("Đổi mật khẩu thành công");
            setStepForgot(1);
        } else {
            message.error("Không đổi được");
        }
    };

    // ===== UI =====
    const contentList = {
        "1": (
            <div>
                <Input.Password placeholder="Mật khẩu cũ" onChange={(e) => setOldPassword(e.target.value)} />
                <Input.Password placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                <Input.Password placeholder="Xác nhận" onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button type="primary" onClick={handleChangePassword}>Đổi mật khẩu</Button>
            </div>
        ),

        "2": (
            <div>
                {stepEmail === 1 && (
                    <>
                        <Input placeholder="Email mới" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <Button type="primary" disabled={!newEmail} onClick={sendOTPEmail}>
                            Gửi OTP
                        </Button>
                    </>
                )}

                {stepEmail === 2 && (
                    <>
                        <Input placeholder="OTP" value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} />

                        <Button type="primary" disabled={!otpEmail} onClick={verifyOTPEmail}>
                            Xác nhận
                        </Button>

                        <Button
                            style={{ marginLeft: 10 }}
                            disabled={countdownEmail > 0}
                            onClick={sendOTPEmail}
                        >
                            {countdownEmail > 0 ? `Gửi lại (${countdownEmail}s)` : "Gửi lại OTP"}
                        </Button>
                    </>
                )}
            </div>
        ),

        "3": (
            <div>
                {stepForgot === 1 && (
                    <>
                        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button type="primary" disabled={!email} onClick={sendOTPForgot}>
                            Gửi OTP
                        </Button>
                    </>
                )}

                {stepForgot === 2 && (
                    <>
                        <Input placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

                        <Button type="primary" disabled={!otp} onClick={verifyOTPForgot}>
                            Xác nhận
                        </Button>

                        <Button
                            style={{ marginLeft: 10 }}
                            disabled={countdownForgot > 0}
                            onClick={sendOTPForgot}
                        >
                            {countdownForgot > 0 ? `Gửi lại (${countdownForgot}s)` : "Gửi lại OTP"}
                        </Button>
                    </>
                )}

                {stepForgot === 3 && (
                    <>
                        <Input.Password placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                        <Input.Password placeholder="Xác nhận" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button type="primary" onClick={resetPassword}>
                            Đổi mật khẩu
                        </Button>
                    </>
                )}
            </div>
        ),
    };

    return (
        <Card
            title="Bảo mật"
            tabList={[
                { key: "1", tab: "Đổi mật khẩu" },
                { key: "2", tab: "Đổi email" },
                { key: "3", tab: "Quên mật khẩu" },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key) => setActiveTabKey(key)}
        >
            {contentList[activeTabKey]}
        </Card>
    );
};

export default USsecurity;