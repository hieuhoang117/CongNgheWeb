import MovieSlide from "./US_slide";
import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import MovieTop from "./Movie_Top.jsx";
import "./Menu_main.css";


const Menu_series = () => {
  const [series, setSeries] = useState([]);
  const [serieshorror, setSeriesHorror] = useState([]);
  const [seriesromance, setSeriesRomance] = useState([]);
  const [seriesscifi, setSeriesScifi] = useState([]);
  const [seriescomedy, setSeriesComedy] = useState([]);
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
              setSeries(data.series || []);
              break;
            case "Comedy":
              setSeriesComedy(data.series || []);
              break;
            case "Horror":
              setSeriesHorror(data.series || []);
              break;
            case "Romance":
              setSeriesRomance(data.series || []);
              break;
            case "Sci-fi":
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
  const fetchTopSeries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/series/top");
        const data = await res.json();
        setTopSeries(data || []);
    } catch (err) {
      console.error(err);
    }
    };
    useEffect(() => {
        fetchTopSeries();
    }, []);

  return (
    <div className="menu-main">
      <MovieSlide />
      {series.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Nếu bạn thích series cảm giác mạnh" movies={series} />
      )}
      {serieshorror.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series rùng rợn" movies={serieshorror} />
      )}
      {seriesscifi.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series khoa học viễn tưởng" movies={seriesscifi} />
      )}
      {seriescomedy.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series hài hước" movies={seriescomedy} />
      )}
      {seriesromance.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <MovieRow title="Series lãng mạn" movies={seriesromance} />
      )}
      {topSeries.length === 0 ? (
        <p style={{ color: "white", padding: 20 }}>Đang tải...</p>
      ) : (
        <div className="top10-row">
          <h2>Top series xem nhiều nhất</h2>

          <div className="top10-list">
            {topSeries.map((series, index) => (
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

export default Menu_series;