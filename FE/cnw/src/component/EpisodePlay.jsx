import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import EpisodeItem from "./EpisodeItem";
import "./EpisodePlay.css";

const EpisodePlay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef();
    const activeRef = useRef();

    const [episode, setEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [showList, setShowList] = useState(false);

    // 🔥 Load dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy tập hiện tại
                const res1 = await fetch(`http://localhost:5000/api/series/episodes/${id}`);
                const data = await res1.json();
                setEpisode(data);

                // Lấy danh sách tập
                const res2 = await fetch(`http://localhost:5000/api/series/episodes/series/${data.IDseries}`);
                const list = await res2.json();

                if (Array.isArray(list)) {
                    // ✅ Sort đúng thứ tự tập
                    setEpisodes(
                        list.sort((a, b) => a.EpisodeNumber - b.EpisodeNumber)
                    );
                } else {
                    setEpisodes([]);
                }

            } catch (err) {
                console.error("FETCH ERROR:", err);
            }
        };

        fetchData();
    }, [id]);

    // 🔥 Scroll tới tập đang xem
    useEffect(() => {
        if (showList && activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [showList]);

    if (!episode) return <div style={{ color: "white", padding: 20 }}>Loading...</div>;

    return (
        <div className="netflix-player">

            {/* VIDEO */}
            <video
                key={episode.IDEpisode}
                ref={videoRef}
                src={episode.film}
                autoPlay
                controls
                className="netflix-video"
            />

            {/* BACK */}
            <button className="nf-back" onClick={() => navigate(-1)}>←</button>

            {/* OPEN LIST */}
            <button className="nf-list-btn" onClick={() => setShowList(!showList)}>
                ☰
            </button>

            {/* BACKDROP */}
            {showList && (
                <div className="nf-backdrop" onClick={() => setShowList(false)} />
            )}

            {/* SIDEBAR */}
            <div className={`nf-sidebar ${showList ? "show" : ""}`}>

                <div className="nf-header">
                    <button className="nf-back-list" onClick={() => setShowList(false)}>←</button>
                    <span>Mùa {episode.SeasonNumber || 1}</span>
                </div>

                {/* 🔥 DANH SÁCH TẬP */}
                {episodes.map((ep) => {
                    const isActive = String(ep.IDEpisode) === String(id);
                    console.log("EPISODES STATE:", episodes);

                    return (
                        <div
                            key={ep.IDEpisode}
                            ref={isActive ? activeRef : null}
                            className={`episode-wrapper ${isActive ? "active-episode" : ""}`}
                        >
                            <EpisodeItem
                                ep={ep}
                                onClick={() => {
                                    videoRef.current?.pause();
                                    navigate(`/user/watch/${ep.IDEpisode}`);
                                    setShowList(false);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EpisodePlay;