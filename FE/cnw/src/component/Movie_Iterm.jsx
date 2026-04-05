import { useState } from "react";

const MovieItem = ({ movie }) => {
  const [hovered, setHovered] = useState(false);

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
            <button>▶</button>
            <button>ℹ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;