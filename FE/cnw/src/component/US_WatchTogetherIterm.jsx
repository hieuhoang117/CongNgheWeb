import React from "react";
import { useNavigate } from "react-router-dom";

const USWatchIterm = ({ movies, onEndSession }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="watch-items-container">
            {movies.map((movie) => (
                <div key={movie.SessionID} className="watch-item">
                    <div className="movie-poster">
                        <img 
                            src={movie.Poster || "/placeholder.jpg"} 
                            alt={movie.ContentName}
                        />
                        <div className="live-badge">🔴 LIVE</div>
                    </div>

                    <div className="movie-info">
                        <h3>{movie.ContentName}</h3>
                        <p className="session-id">Session: {movie.SessionID}</p>
                        <p className="start-time">
                            ⏰ Bắt đầu: {formatDate(movie.StartTime)}
                        </p>
                    </div>

                    <div className="movie-actions">
                        <button 
                            className="btn-join"
                            onClick={() => {
                                navigate(`/user/watch_together/play/${movie.SessionID}`);
                            }}
                        >
                            Tham gia xem
                        </button>
                        <button 
                            className="btn-end"
                            onClick={() => onEndSession(movie.SessionID)}
                        >
                            Kết thúc
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default USWatchIterm;