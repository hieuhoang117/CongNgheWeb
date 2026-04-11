import { Table, Button, Space, Modal, Form, Input, Popconfirm, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Option } = Select;

const AM_notifix = () => {
    const [notifix, setNotifix] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotifix, setEditingNotifix] = useState(null);
    const [contents, setContents] = useState([]);
    const [form] = Form.useForm();

    const fetchNotifix = async () => {
        const res = await fetch("http://localhost:5000/api/notifix");
        const data = await res.json();
        setNotifix(data);
    };

    useEffect(() => {
        fetchNotifix();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/notifix/${id}`, {
            method: "DELETE",
        });
        fetchNotifix();
    };

    const handleEdit = (record) => {
        setEditingNotifix(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingNotifix(null);
        form.resetFields();
        setIsModalOpen(true);
    };
    const fetchContent = async () => {
        const res = await fetch("http://localhost:5000/api/notifix/content");
        const data = await res.json();
        setContents(data);
    };

    useEffect(() => {
        fetchNotifix();
        fetchContent(); // thêm dòng này
    }, []);

    const handleFind = async (title) => {
        if (!title) return fetchNotifix();

        const res = await fetch(`http://localhost:5000/api/notifix/name/${title}`);
        const data = await res.json();
        setNotifix(data);
    };

    const handleOk = async () => {
        const values = await form.validateFields();

        const payload = {
            Title: values.Title,
            Message: values.Message,
            ImageURL: values.ImageURL,
            ExpiredAt: values.ExpiredAt || null,
            IsActive: values.IsActive ?? true,
            ContentID: values.ContentID || null,
        };

        if (editingNotifix) {
            await fetch(`http://localhost:5000/api/notifix/${editingNotifix.NotificationID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch("http://localhost:5000/api/notifix", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        setIsModalOpen(false);
        fetchNotifix();
    };

    const columns = [
        { title: "Tiêu đề", dataIndex: "Title" },
        { title: "Nội dung", dataIndex: "Message" },

        {
            title: "Ảnh",
            dataIndex: "ImageURL",
            render: (url, record) => url && <img src={url} alt={record.Title} width={80} />,
        },

        {
            title: "Ngày hết hạn",
            dataIndex: "ExpiredAt",
            render: (text) => (text ? text.split("T")[0] : ""),
        },

        {
            title: "Trạng thái",
            dataIndex: "IsActive",
            render: (val) => (val ? "✔️ Bật" : "❌ Tắt"),
        },
        { title: "Liên kết nội dung", dataIndex: "ContentID", 
            render: (id) => {const content = contents.find(c => c.ContentID === id);
            return content ? `${content.ContentName} (${content.ContentType})` : "Không có";} 
        },
        {
            title: "Action",
            render: (record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm title="Xóa?" onConfirm={() => handleDelete(record.NotificationID)}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý thông báo</h2>

            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                + Thêm thông báo
            </Button>

            <Input
                placeholder="Tìm thông báo..."
                onChange={(e) => handleFind(e.target.value)}
                style={{ marginBottom: 15 }}
            />

            <Table
                columns={columns}
                dataSource={notifix}
                rowKey="NotificationID"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingNotifix ? "Sửa" : "Thêm"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="Title" label="Tiêu đề" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="Message" label="Nội dung" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Ảnh">
                        <Upload
                            action="http://localhost:5000/api/upload"
                            maxCount={1}
                            onChange={(info) => {
                                if (info.file.status === "done") {
                                    form.setFieldsValue({ ImageURL: info.file.response.url });
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="ExpiredAt" label="Ngày hết hạn">
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item name="IsActive" label="Trạng thái">
                        <Select>
                            <Option value={true}>Bật</Option>
                            <Option value={false}>Tắt</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="ContentID" label="Liên kết nội dung">
                        <Select placeholder="Chọn phim / series">
                            {contents.map((c) => (
                                <Option key={c.ContentID} value={c.ContentID}>
                                    {c.ContentName} ({c.ContentType})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="ImageURL" hidden><input /></Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AM_notifix;