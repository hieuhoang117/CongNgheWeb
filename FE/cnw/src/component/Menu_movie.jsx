import MovieSlide from "./US_slide";
import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import MovieTop from "./Movie_Top.jsx";
import "./Menu_main.css";


const Menu_movie = () => {
  const [movies, setMovies] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = ["Action", "Comedy", "Horror", "Romance", "Sci-fi"];

        const promises = category.map(async (cat) => {
          const res = await fetch(`http://localhost:5000/api/movies/category/${cat}`);
          const data = await res.json();
          return { category: cat, data };
        });

        const results = await Promise.all(promises);

        results.forEach(({ category, data }) => {
          switch (category) {
            case "Action":
              setMovies(data.movies || []);
              break;
            case "Comedy":
              setComedy(data.movies || []);

              break;
            case "Horror":
              setHorror(data.movies || []);
              break;
            case "Romance":
              setRomance(data.movies || []);
              break;
            case "Sci-fi":
              setScifi(data.movies || []);
              break;

            default:
              console.warn("Unknown category:", category);
              break;
          }
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const fetchTopMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies/top");
        const data = await res.json();
        setTopSeries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);


  return (
    <div className="menu-main">
      <MovieSlide movies={topSeries}/>

      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Nếu bạn thích phim cảm giác mạnh" movies={movies} />
      )}
      {horror.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Sự rùng rợn" movies={horror} />
      )}
      {scifi.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Khoa học viễn tưởng" movies={scifi} />
      )}

      {comedy.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải..</p>
      ) : (
        <MovieRow title="Hài hước" movies={comedy} />
      )}

      {romance.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Lãng mạn" movies={romance} />
      )}
      {topSeries.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <div className="top10-row">
          <h2>Top phim xem nhiều nhất</h2>

          <div className="top10-list">
            {topSeries.slice(0, 10).map((movie, index) => (
              <MovieTop
                key={movie.IDmovie}
                movie={movie}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu_movie;