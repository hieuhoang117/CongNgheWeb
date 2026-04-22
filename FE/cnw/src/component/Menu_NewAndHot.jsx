import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import "./Menu_NewAndHot.css";
import MovieTop from "./Movie_Top";

const Menu_NewAndHot = () => {
    const [newMovies, setNewMovies] = useState([]);
    const [commingSoonMovies, setCommingSoonMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);

    const fetchNewMovies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/movies/new");
            const data = await res.json();
            setNewMovies(data);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchCommingSoonMovies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/movies/commingsoon");
            const data = await res.json();
            setCommingSoonMovies(data);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchTopMovies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/movies/top");
            const data = await res.json();
            setTopMovies(data);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchTopSeries = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/series/top");
            const data = await res.json();
            setTopSeries(data);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        fetchNewMovies();
        fetchCommingSoonMovies();
        fetchTopMovies();
        fetchTopSeries();
    }, []);

    return (
        <div className="menu-main-new-and-hot">
            <MovieRow title="Mới trên netflix" movies={newMovies} />
            {topMovies.length === 0 ? (
                <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
            ) : (
                <div className="top10-row">
                    <h2>Top phim xem nhiều nhất</h2>
                    <div className="top10-list">
                        {topMovies.slice(0, 10).map((movie, index) => (
                            <MovieTop
                                key={movie.IDmovie}
                                movie={movie}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}
            <MovieRow title="Sắp ra mắt" movies={commingSoonMovies} />
            {topSeries.length === 0 ? (
                <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
            ) : (
                <div className="top10-row">
                    <h2>Top series xem nhiều nhất</h2>
                    <div className="top10-list">
                        {topSeries.slice(0, 10).map((series, index) => (
                            <MovieTop
                                key={series.IDseries}
                                movie={series}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu_NewAndHot;