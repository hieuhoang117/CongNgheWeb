import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import "./US_slide.css";

const MovieSlide = ({ movies }) => {
  const navigate = useNavigate();

  const handlePlay = (movie) => {
    if (movie.IDmovie) {
      navigate(`/user/movie/${movie.IDmovie}`);
    } else if (movie.IDseries) {
      navigate(`/user/series/${movie.IDseries}`);
    }
  };

  return (
    <Carousel autoplay>
      {movies.map((movie) => (
        <div key={movie.IDmovie || movie.IDseries}>
          <div
            className="descrip"
            style={{ backgroundImage: `url(${movie.Poster || movie.poster})` }}
          >
            <div>
              <h1>{movie.NameMovie || movie.SeriesName}</h1>
              <p>{movie.Description}</p>
              <button
                className="btn-play"
                onClick={() => handlePlay(movie)}
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