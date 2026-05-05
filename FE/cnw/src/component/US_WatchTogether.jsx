import "./US_WatchTogether.css";
import USWatchIterm from "./US_WatchTogetherIterm";
import { useEffect, useState } from "react";
import axios from "axios";

const US_WatchTogether = () => {
    const [contents, setContents] = useState([]);
    const [isopen, setIsopen] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        contentId: "",
    });

    // 🔹 Lấy danh sách session đang live
    const fetchSessions = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/coment/session");
            const data = await res.json();
            setSessions(data);
        } catch (err) {
            console.error("Error fetching sessions:", err);
        }
    };

    // 🔹 Lấy danh sách phim
    const fetchContent = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/notifix/content");
            const data = await res.json();
            setContents(data);
        } catch (err) {
            console.error("Error fetching content:", err);
        }
    };

    useEffect(() => {
        fetchContent();
        fetchSessions();

        // Auto refresh mỗi 10 giây
        const interval = setInterval(() => {
            fetchSessions();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 🔥 TẠO SESSION MỚI
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/coment/session",
                {
                    contentId: form.contentId,
                }
            );

            console.log("✅ Session created:", res.data.sessionId);

            // Reset form
            setForm({ contentId: "" });
            setIsopen(false);

            // Reload danh sách session
            await fetchSessions();

            alert("✅ Tạo buổi công chiếu thành công!");

        } catch (err) {
            console.error("❌ Error creating session:", err);
            alert("❌ Không thể tạo buổi công chiếu. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 KẾT THÚC SESSION
    const handleEndSession = async (sessionId) => {
        if (!window.confirm("Bạn có chắc muốn kết thúc buổi công chiếu này?")) {
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/coment/session/end", {
                sessionId: sessionId,
            });

            alert("✅ Đã kết thúc buổi công chiếu!");
            fetchSessions();

        } catch (err) {
            console.error("Error ending session:", err);
            alert("❌ Không thể kết thúc buổi công chiếu!");
        }
    };

    return (
        <div className="US_WatchTogether">
            <div className="header-section">
                <h2>🎬 Các buổi công chiếu đang diễn ra</h2>
                <button
                    className="btn-open"
                    onClick={() => setIsopen(true)}
                >
                    + Tạo công chiếu mới
                </button>
            </div>

            {/* 🔥 FORM TẠO SESSION */}
            {isopen && (
                <div className="watch-form-wrapper" onClick={() => setIsopen(false)}>
                    <form 
                        className="watch-form" 
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="form-header">
                            <h3>Tạo buổi công chiếu</h3>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setIsopen(false)}
                            >
                                ✖
                            </button>
                        </div>

                        <div className="form-body">
                            <label>Chọn phim:</label>
                            <select
                                name="contentId"
                                value={form.contentId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Chọn phim --</option>
                                {contents.map((c) => (
                                    <option key={c.ContentID} value={c.ContentID}>
                                        {c.ContentName}
                                    </option>
                                ))}
                            </select>
                            <input type="date" ></input>
                            <input type="time"></input>

                            <button type="submit" disabled={loading}>
                                {loading ? "Đang tạo..." : "Tạo buổi công chiếu"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {sessions.length === 0 ? (
                <div className="no-sessions">
                    <p>Chưa có buổi công chiếu nào đang diễn ra</p>
                </div>
            ) : (
                <USWatchIterm 
                    movies={sessions} 
                    onEndSession={handleEndSession}
                />
            )}
        </div>
    );
};

export default US_WatchTogether;