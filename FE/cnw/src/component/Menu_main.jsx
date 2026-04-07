import MovieSlide from "./US_slide";
import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import "./Menu_main.css";

const Menu_main = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = "Action";

        const res = await fetch(`http://localhost:5000/api/movies/category/${category}`);
        const data = await res.json();

        console.log("DATA:", data);
        
        setMovies(data.movies || []);
        setSeries(data.series || []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="menu-main">
      <MovieSlide />

      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải phim...</p>
      ) : (
        <MovieRow title="Trending Movies" movies={movies} />
      )}

      {series.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải series...</p>
      ) : (
        <MovieRow title="Trending Series" movies={series} />
      )}
      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải phim...</p>
      ) : (
        <MovieRow title="Có thể bạn sẽ thích" movies={movies} />
      )}
      {series.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải series...</p>
      ) : (
        <MovieRow title="Tốt nhất của chúng tôi" movies={series} />
      )}
      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải phim...</p>
      ) : (
        <MovieRow title="Bắt đầu hứng thú mới" movies={movies} />
      )}
      {series.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải series...</p>
      ) : (
        <MovieRow title="Series nổi bật" movies={series} />
      )}
    </div>
  );
};

export default Menu_main;