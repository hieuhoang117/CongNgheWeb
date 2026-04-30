import "./US_info.css";
import { useState, useEffect } from "react";
import userStore from "../store/useUserStore";
import { Form, Input, Card, Avatar, Button, Tag, Select } from "antd";
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
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userID]);


    const handleEdit = () => {
        form.setFieldsValue(userInfo);
        setIsEditing(true);
    };

    const onFinish = async (values) => {
        try {
            await fetch(`http://localhost:5000/api/users/${userID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            setUserInfo({ ...userInfo, ...values }); // update UI
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="usinfo-container">
            <Card title="Thông tin cá nhân">

                {/* Header */}
                <div className="header-box">
                    <Avatar size={80} icon={<UserOutlined />} />
                    <h2>{userInfo?.FullName}</h2>

                    <Tag color={userInfo?.Status ? "green" : "red"}>
                        {userInfo?.Status ? "Hoạt động" : "Bị khóa"}
                    </Tag>
                </div>

                {/* Form */}
                <Form form={form} layout="vertical" onFinish={onFinish}>

                    <Form.Item name="FullName" label="Họ tên">
                        <Input disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item name="Email" label="Email">
                        <Input disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item name="Phone" label="Số điện thoại">
                        <Input disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item name="Role" label="Vai trò">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item name="Status" label="Trạng thái">
                        <Select disabled>
                            <Select.Option value={true}>Hoạt động</Select.Option>
                            <Select.Option value={false}>Bị khóa</Select.Option>
                        </Select>
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
                        <Button type="primary" onClick={handleEdit}>
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