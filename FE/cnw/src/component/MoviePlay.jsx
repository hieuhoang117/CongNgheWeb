import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MoviePlay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/id/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data.movie || data[0] || data));
    }, [id]);

    if (!movie) return <div style={{ color: "white" }}>Loading...</div>;

    return (
        <div style={{ background: "black", height: "100vh", position: "relative" }}>

            <video
                src={movie.Film}
                controls
                autoPlay
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />
        </div>
    );
};

export default MoviePlay;