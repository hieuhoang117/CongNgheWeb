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
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // Fetch movie
    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/id/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data.movie || data[0] || data));
    }, [id]);

    // Update progress
    useEffect(() => {
        const video = videoRef.current;

        const updateProgress = () => {
            setProgress(video.currentTime);
            setDuration(video.duration);
        };

        video?.addEventListener("timeupdate", updateProgress);

        return () => {
            video?.removeEventListener("timeupdate", updateProgress);
        };
    }, []);

    // Auto hide controls
    useEffect(() => {
        let timeout;

        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setShowControls(false), 3000);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

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

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = percent * duration;
    };

    const formatTime = (time) => {
        if (!time) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="mp-player">

            <video
                ref={videoRef}
                src={movie.Film}
                autoPlay
                className="mp-video"
                onClick={togglePlay}
            />

            {/* Back */}
            <button className="mp-back" onClick={() => navigate(-1)}>
                ←
            </button>

            {/* Controls */}
            <div className={`mp-controls ${showControls ? "show" : ""}`}>

                {/* Progress */}
                <div className="mp-progress" onClick={handleSeek}>
                    <div
                        className="mp-progress-bar"
                        style={{ width: `${(progress / duration) * 100}%` }}
                    />
                </div>

                <div className="mp-buttons">

                    <div className="mp-left">
                        <button onClick={togglePlay}>
                            {isPlaying ? "⏸" : "▶"}
                        </button>
                        <button onClick={() => videoRef.current.currentTime -= 10}>⏪</button>
                        <button onClick={() => videoRef.current.currentTime += 10}>⏩</button>
                    </div>

                    <div className="mp-right">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            onChange={(e) => videoRef.current.volume = e.target.value}
                        />
                        <button onClick={() => videoRef.current.requestFullscreen()}>⛶</button>
                    </div>
                </div>

                <div className="mp-time">
                    {formatTime(progress)} / {formatTime(duration)}
                </div>

                <div className="mp-title">{movie.NameMovie}</div>
            </div>
        </div>
    );
};

export default MoviePlay;