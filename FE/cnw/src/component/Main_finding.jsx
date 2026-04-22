import { useState, useEffect } from "react";
import "./Main_finding.css";
import MovieItem from "./Movie_Iterm";
import { useParams } from "react-router-dom";

const Main_finding = () => {
    const [movie, setmovie] = useState([]);
    const { searchInput } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/search/${searchInput}`);
                const data = await res.json();
                setmovie(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (searchInput) {
            fetchData();
        }
    }, [searchInput]);

    return (
        <div className="main-finding">
            <h1 className="finding-title">Kết quả tìm kiếm theo: "{searchInput}"</h1>
            <div className="movie-list_genre">
                {movie.map((watchedItem) => (
                    <div className="movie-card-wrapper" key={watchedItem.IDmovie}>
                        <MovieItem movie={watchedItem} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main_finding;