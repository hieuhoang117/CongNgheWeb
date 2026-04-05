import { Carousel } from "antd";
import { useEffect, useState } from "react";

const MovieSlide = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => {
        // giả sử phim mới là 5 phim đầu
        setMovies(data.slice(0, 5));
      });
  }, []);

  return (
    <Carousel autoplay>
      {movies.map((movie) => (
        <div key={movie.IDmovie}>
          <div
            style={{
              height: "400px",
              backgroundImage: `url(${movie.Poster})`,
              backgroundSize: "cover",
              color: "white",
              display: "flex",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div>
              <h1>{movie.NameMovie}</h1>
              <p>{movie.Description}</p>
              <button style={{backgroundColor: "red", color: "white", padding: "10px 20px", fontSize: "16px" }}>
                Xem ngay
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MovieSlide;