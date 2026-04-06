import { useState } from "react";
import "./Movie_Iterm.css";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`movie-item ${hovered ? "active" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.MoviePoster || movie.SeriesPoster}
        alt={movie.NameMovie || movie.SeriesName}
      />

      {hovered && (
        <div className="movie-card">
          <h4>{movie.NameMovie || movie.SeriesName}</h4>

          <p>
            {movie.movieDescription ||
              movie.seriesDescription ||
              "Không có mô tả"}
          </p>

          <div className="actions">
            <button onClick={() => navigate(`/user/movie/${movie.IDmovie}/play`)}>
              ▶
            </button>
            <button onClick={() => navigate(`/user/movie/${movie.IDmovie}`)}>
              ℹ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;