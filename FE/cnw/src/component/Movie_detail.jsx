import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Movie_detail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/id/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data.movie || data[0] || data);
      });
  }, [id]);

  if (!movie) return <div style={{color:"white"}}>Loading...</div>;

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div
          className="banner"
          style={{
            backgroundImage: `url(${movie.Backdrop || movie.Poster})`
          }}
        >
          <div className="banner-content">
            <h1>{movie.NameMovie}</h1>

            <div className="btn-group">
              <button className="play-btn" onClick={() => navigate(`/user/movie/${movie.IDmovie}/play`)}>
                ▶ Phát
              </button>
            </div>
          </div>
        </div>

        <div className="info">
          <p>{movie.Description}</p>

          <div className="meta">
            <span>{movie.Year}</span>
            <span>{movie.Duration} phút</span>
            <span>{movie.Category}</span>
            <span>{movie.Country}</span>
            <span>{movie.Director}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;