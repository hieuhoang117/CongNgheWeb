import Coment from "./Coment.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const US_WatchTogetherPlay = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const fetchMovies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/movies");
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);
    return (
        <div>
            <h1>US_WatchTogetherPlay</h1>
            <video src={movie.film} />
            <Coment />
        </div>
    )

};

export default US_WatchTogetherPlay;