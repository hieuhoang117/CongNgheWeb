import { Table, Button, Input, Space, Form, Select, Modal, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const AM_series = () => {
    const [series, setSeries] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const { Option } = Select;
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSeries, setEditingSeries] = useState(null);

    const [formSeries] = Form.useForm();
    const [formEpisode] = Form.useForm();
    const fetchSeries = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/series");
            const data = await res.json();
            setSeries(data);
        } catch (error) {
            console.error("Error fetching series:", error);
        }
    };
    const handleepisodefromseries = async (seriesId) => {
        try {
            if (!seriesId) {
                return;
            }
            const res = await fetch(`http://localhost:5000/api/series/episodes/${seriesId}`);
            const data = await res.json();
            setEpisodes(data);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        }
    };


    useEffect(() => {
        fetchSeries();
    }, []);
    const handleFinserie = async (name) => {
        try {
            if (!name) {
                fetchSeries();
                return;
            }

            const res = await fetch(
                `http://localhost:5000/api/series/name/${name}`
            );
            const data = await res.json();
            setSeries(data);
        } catch (err) {
            console.error(err);
        }
    };
    const columns = [
        { title: "ID", dataIndex: "IDseries" },
        { title: "Tên series", dataIndex: "SeriesName" },
        { title: "Mô tả", dataIndex: "Description" },
        { title: "Năm phát hành", dataIndex: "ReleaseYear" },
        { title: "Quốc gia", dataIndex: "Country" },
        {
            title: "Trạng thái",
            dataIndex: "Status",
            render: (text) => (text ? "Đang chiếu" : "Ngưng")
        },
        { title: "Content ID", dataIndex: "ContentID" },
        {
            title: "Poster",
            dataIndex: "poster",
            render: (url) => url && <img src={url} alt="" width={80} />,
        },
        {
            title: "Action", render: (record) => (
                <Space>
                    <Button onClick={() => {
                        setEditingSeries(record);

                        formSeries.setFieldsValue({
                            ...record,
                            ReleaseYear: record.ReleaseYear
                                ? record.ReleaseYear.split("T")[0]
                                : null
                        });

                        setIsModalOpen(true);
                    }}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => handleDeleteSeries(record.IDseries)}>
                        Xóa
                    </Button>
                </Space>
            )
        }
    ];
    const columnsepisodes = [
        { title: "ID", dataIndex: "IDEpisode" },
        { title: "Tên tập", dataIndex: "EpisodeName" },
        { title: "Mùa", dataIndex: "SeasonNumber" },
        { title: "Số tập", dataIndex: "EpisodeNumber" },
        { title: "Thời lượng", dataIndex: "Duration" },
        { title: "Ngày phát hành", dataIndex: "ReleaseDate" },
        { title: "Link phim", dataIndex: "film" },
        {
            title: "Action", render: (record) => (
                <Space>
                    <Button onClick={() => console.log("Edit", record)}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => console.log("Delete", record)}>Xóa</Button>
                </Space>
            )
        }
    ];
    const handleAddSeries = () => {
        formSeries.validateFields().then(values => {
            console.log("Form values:", values);
            formSeries.resetFields();
        }).catch(info => {
            console.log("Validate Failed:", info);
        });
    }
    const handleDeleteSeries = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/series/${id}`, { method: "DELETE" });
            fetchSeries();
        } catch (err) {
            console.error(err);
        }
    };
    const handleOk = async () => {
        try {
            const values = await formSeries.validateFields();

            if (editingSeries) {

                await fetch(`http://localhost:5000/api/series/${editingSeries.IDseries}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            } else {

                await fetch("http://localhost:5000/api/series/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            }

            setIsModalOpen(false);
            formSeries.resetFields();
            fetchSeries();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Danh sách series</h2>
            <Button type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => {
                    setEditingSeries(null);
                    formSeries.resetFields();
                    setIsModalOpen(true);
                }}>
                Thêm series
            </Button>
            <Input placeholder="Tìm kiếm theo tên series" style={{ marginBottom: 16, width: 300 }} 
                onChange={(e) => handleFinserie(e.target.value)}
            />
            <Table dataSource={series} onRow={(record) => ({
                onClick: () => {
                    setSelectedSeriesId(record.IDseries);
                    handleepisodefromseries(record.IDseries);
                }
            })} columns={columns} rowKey="IDseries" pagination={{ pageSize: 5 }} />
            <h2>Danh sách tập phim</h2>
            <Button
                type="primary"
                onClick={() => {
                    if (!selectedSeriesId) {
                        alert("Vui lòng chọn series trước!");
                        return;
                    }
                    formEpisode.resetFields();
                }}
                style={{ marginBottom: 16 }}
            >
                Thêm tập phim
            </Button>
            <Input placeholder="Tìm kiếm theo tên tập phim" style={{ marginBottom: 16, width: 300 }} />
            <Table dataSource={episodes} columns={columnsepisodes} rowKey="IDEpisode" pagination={{ pageSize: 5 }} />
            <Modal
                title={editingSeries ? "Sửa series" : "Thêm series"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText="Lưu"
            >
                <Form form={formSeries} layout="vertical">
                    <Form.Item
                        name="SeriesName"
                        label="Tên series"
                        rules={[{ required: true, message: "Vui lòng nhập tên series" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Description"
                        label="Mô tả"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="ReleaseYear"
                        label="Năm phát hành"
                        rules={[{ required: true, message: "Vui lòng nhập năm phát hành" }]}
                    >
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item
                        name="Country"
                        label="Quốc gia"
                        rules={[{ required: true, message: "Vui lòng nhập quốc gia" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="ContentID"
                        label="Mã nội dung"
                        rules={[{ required: true, message: "Vui lòng nhập mã nội dung" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="Status"
                        label="Trạng thái">
                        <Select>
                            <Option value={true}>Đang chiếu</Option>
                            <Option value={false}>Ngưng chiếu</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Poster">
                        <Upload
                            action="http://localhost:5000/api/upload"
                            listType="picture"
                            maxCount={1}
                            onChange={(info) => {
                                if (info.file.status === "done") {
                                    formSeries.setFieldsValue({ poster: info.file.response.url });
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="poster" hidden><input /></Form.Item>
                </Form>
            </Modal>

        </div>

    );
}
export default AM_series;