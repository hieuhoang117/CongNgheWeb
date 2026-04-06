import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./MoviePlay.css";

const MoviePlay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef();

    const [movie, setMovie] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/id/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data.movie || data[0] || data));
    }, [id]);

    if (!movie) return <div className="mp-loading">Loading...</div>;
    const togglePlay = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            className="mp-player"
            onMouseMove={() => setShowControls(true)}
        >
            <video
                ref={videoRef}
                src={movie.Film}
                autoPlay
                className="mp-video"
                onClick={() => togglePlay()}
            />

            
            <button className="mp-back" onClick={() => navigate(-1)}>
                ←
            </button>

           
            <div className={`mp-controls ${showControls ? "show" : ""}`}>
                <div className="mp-progress"></div>

                <div className="mp-buttons">
                    <button onClick={togglePlay}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button onClick={() => videoRef.current.currentTime -= 10}>⏪ </button>
                    <button onClick={() => videoRef.current.currentTime += 10}>⏩ </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={(e) => videoRef.current.volume = e.target.value}
                    />
                    <button onClick={() => videoRef.current.requestFullscreen()}>⛶</button>
                </div>

                <div className="mp-title">{movie.NameMovie}</div>
            </div>
        </div>
    );
};

export default MoviePlay;