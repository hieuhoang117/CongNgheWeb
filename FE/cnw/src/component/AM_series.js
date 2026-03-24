import { Table, Button, Input, Space, Form, Select, Modal, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AM_series = () => {
    const [series, setSeries] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const { Option } = Select;
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);

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
    const columns = [
        { title: "ID", dataIndex: "IDseries" },
        { title: "Tên series", dataIndex: "SeriesName" },
        { title: "Mô tả", dataIndex: "Description" },
        { title: "Năm phát hành", dataIndex: "ReleaseYear" },
        { title: "Quốc gia", dataIndex: "Country" },
        {
            title: "Trạng thái",
            render: (text) => (text ? "Tập mới" : "Không hoạt động")
        },
        { title: "Content ID", dataIndex: "ContentID" },
        { title: "Poster", dataIndex: "poster" },
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

    return (
        <div>
            <h2>Danh sách series</h2>
            <Button type="primary" style={{ marginBottom: 16 }}>
                Thêm series
            </Button>
            <Input placeholder="Tìm kiếm theo tên series" style={{ marginBottom: 16, width: 300 }} />
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

    
        </div>

    );
}
export default AM_series;