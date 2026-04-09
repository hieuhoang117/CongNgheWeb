import MovieSlide from "./US_slide";
import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import MovieTop from "./Movie_Top.jsx";
import "./Menu_main.css";


const Menu_main = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [horror, setHorror] = useState([]);
  const [serieshorror, setSeriesHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [seriesromance, setSeriesRomance] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [seriesscifi, setSeriesScifi] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [seriescomedy, setSeriesComedy] = useState([]);

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
              setSeries(data.series || []);
              break;
            case "Comedy":
              setComedy(data.movies || []);
              setSeriesComedy(data.series || []);
              break;
            case "Horror":
              setHorror(data.movies || []);
              setSeriesHorror(data.series || []);
              break;
            case "Romance":
              setRomance(data.movies || []);
              setSeriesRomance(data.series || []);
              break;
            case "Sci-fi":
              setScifi(data.movies || []);
              setSeriesScifi(data.series || []);
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

  return (
    <div className="menu-main">
      <MovieSlide />

      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Nếu bạn thích phim cảm giác mạnh" movies={movies} />
      )}
      {series.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Nếu bạn thích series cảm giác mạnh" movies={series} />
      )}

      {horror.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Sự rùng rợn" movies={horror} />
      )}
      {serieshorror.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series rùng rợn" movies={serieshorror} />
      )}

      {scifi.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Khoa học viễn tưởng" movies={scifi} />
      )}
      {seriesscifi.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series khoa học viễn tưởng" movies={seriesscifi} />
      )}

      {comedy.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải..</p>
      ) : (
        <MovieRow title="Hài hước" movies={comedy} />
      )}
      {seriescomedy.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series hài hước" movies={seriescomedy} />
      )}

      {romance.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Lãng mạn" movies={romance} />
      )}
      {seriesromance.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series lãng mạn" movies={seriesromance} />
      )}
      {movies.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <div className="top10-row">
          <h2>Top phim xem nhiều nhất</h2>

          <div className="top10-list">
            {movies.slice(0, 10).map((movie, index) => (
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

export default Menu_main;