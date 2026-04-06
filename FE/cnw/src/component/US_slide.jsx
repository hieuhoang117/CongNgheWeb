import { Carousel } from "antd";
import { useEffect, useState } from "react";
import "./US_slide.css";

const MovieSlide = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => {
        
        setMovies(data.slice(0, 5));
      });
  }, []);

  return (
    <Carousel autoplay>
      {movies.map((movie) => (
        <div key={movie.IDmovie}>
          <div className="descrip"
          style={{ backgroundImage: `url(${movie.Poster})` }}
          >
            <div>
              <h1>{movie.NameMovie}</h1>
              <p>{movie.Description}</p>
              <button className="btn-play"
              onClick={() => window.location.href = `/user/movie/${movie.IDmovie}`}
              >
                ▶ Phát
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MovieSlide;