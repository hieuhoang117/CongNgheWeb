import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieItem from "./Movie_Iterm";
import "./Movie_genre.css";

const Series_genre = () => {
    const { Category } = useParams();
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/category/${Category}`);
                const data = await res.json();
                setSeries(data.series || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSeries();
    }, [Category]);
    const categoryMap = {
        "Action": "Hành động",
        "Comedy": "Hài hước",
        "Horror": "Kinh dị",
        "Romance": "Lãng mạn",
        "Sci-fi": "Khoa học viễn tưởng",
    };

    return (
        <div className="movie-genre" >
            <h1>Phim: Phim {categoryMap[Category] || Category}</h1>
            <div className="movie-list">
                {series.map((serie) => (
                    <MovieItem key={serie.IDserie} movie={serie} />
                ))}
            </div>
        </div>
    );
}
export default Series_genre;