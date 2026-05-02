import { Card, Input, Button, message } from "antd";
import { useState } from "react";

const USsecurity = () => {
    const [activeTabKey, setActiveTabKey] = useState("1");

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const tabList = [
        {
            key: "1",
            tab: "Đổi mật khẩu",
        },
        {
            key: "2",
            tab: "Đổi email",
        },
    ];
    
    const contentList = {
        "1": (
            <div>
                <Input.Password
                    placeholder="Mật khẩu hiện tại"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <Input.Password
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <Input.Password
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <Button
                    type="primary"
                    onClick={() => {
                        if (password !== confirmPassword) {
                            return message.error("Mật khẩu không khớp");
                        }

                        // TODO: call API change password
                        message.success("Đã gửi yêu cầu đổi mật khẩu");
                    }}
                >
                    Đổi mật khẩu
                </Button>
            </div>
        ),

        "2": (
            <div>
                <Input
                    placeholder="Email mới"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <Input.Password
                    placeholder="Nhập mật khẩu để xác nhận"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <Button
                    type="primary"
                    onClick={() => {
                        // TODO: call API change email
                        message.success("Đã gửi yêu cầu đổi email");
                    }}
                >
                    Đổi email
                </Button>
            </div>
        ),
    };

    return (
        <div>
            <Card
                title="Bảo mật"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => setActiveTabKey(key)}
            >
                {contentList[activeTabKey]}
            </Card>
        </div>
    );
};

export default USsecurity;