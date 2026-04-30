import "./US_info.css";
import { useState, useEffect } from "react";
import userStore from "../store/useUserStore";
import { Form, Input, Card, Avatar, Button, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const USinfo = () => {
    const userID = userStore((state) => state.userId);
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/users/id/${userID}`);
                const data = await res.json();

                setUserInfo(data);
                form.setFieldsValue({
                    fullName: data.FullName,
                    email: data.Email,
                    phone: data.Phone,
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userID, form]);

    const onFinish = (values) => {
        console.log("Update:", values);
        setIsEditing(false);
        // sau này gọi API update ở đây
    };

    return (
        <div className="usinfo-container">
            <Card title="Thông tin cá nhân">

                {/* Avatar + Name */}
                <div className="header-box">
                    <Avatar size={80} icon={<UserOutlined />} />
                    <h2>{userInfo?.FullName}</h2>

                    <Tag color={userInfo?.Status ? "green" : "red"}>
                        {userInfo?.Status ? "Hoạt động" : "Bị khóa"}
                    </Tag>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item label="Họ tên" name="fullName">
                        <Input disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone">
                        <Input disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item label="User ID">
                        <Input value={userInfo?.UserID} disabled />
                    </Form.Item>

                    <Form.Item label="Ngày tạo">
                        <Input
                            value={
                                userInfo?.CreatedAt
                                    ? new Date(userInfo.CreatedAt).toLocaleString()
                                    : ""
                            }
                            disabled
                        />
                    </Form.Item>

                    {/* Buttons */}
                    {!isEditing ? (
                        <Button type="primary" onClick={() => setIsEditing(true)}>
                            Chỉnh sửa
                        </Button>
                    ) : (
                        <div className="btn-group">
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Hủy
                            </Button>
                        </div>
                    )}
                </Form>

            </Card>
        </div>
    );
};

export default USinfo;