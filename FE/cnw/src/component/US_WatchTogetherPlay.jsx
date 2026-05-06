import Coment from "./Coment.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const US_WatchTogetherPlay = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const fetchMovies = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/movies/id/${id}`);
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMovies(id); // ✅ truyền id vào
    }, [id]);

    // ✅ chờ movie load xong mới render
    if (!movie) return <div>Đang tải...</div>;

    return (
        <div>
            <h1>{movie.NameMovie}</h1>
            <video src={movie.Film} controls />
            <Coment />
        </div>
    );
};

export default US_WatchTogetherPlay;