import "./Series_Detail.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EpisodeItem from "./EpisodeItem";

const SeriesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [series, setSeries] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/series/episodes/find/${id}`)
            .then(res => res.json())
            .then(data => {
                setSeries(data.series);
                setEpisodes(data.episodes || []);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!series) return <div style={{ color: "white" }}>Loading...</div>;

    return (
        <div className="modal-overlay" onClick={() => navigate(-1)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Banner */}
                <div
                    className="banner"
                    style={{
                        backgroundImage: `url(${series.poster})`
                    }}
                >
                    <div className="banner-content">
                        <h1>{series.SeriesName}</h1>

                        <div className="btn-group">
                            <button
                                className="play-btn"
                                onClick={() =>
                                    navigate(`/user/series/${series.IDseries}/play`)
                                }
                            >
                                ▶ Phát
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="info">
                    <p>{series.Description}</p>

                    <div className="meta">
                        <span>{new Date(series.ReleaseYear).getFullYear()}</span>
                        <span>{series.Country}</span>
                        <span>{series.Status ? "Đang chiếu" : "Ngừng chiếu"}</span>
                    </div>
                </div>

                {/* Episodes */}
                <div className="episodes">
                    <h2>Danh sách tập</h2>

                    {episodes.map((ep) => (
                        <EpisodeItem
                            key={ep.IDEpisode}
                            ep={ep}
                            onClick={() => navigate(`/user/watch/${ep.IDEpisode}`)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SeriesDetail;