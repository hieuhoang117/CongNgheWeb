import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import "./Movierow.css";

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef();

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-wrapper">
        
        <button className="scroll-btn left" onClick={scrollLeft}>
          <LeftOutlined />
        </button>

     
        <div className="movie-list" ref={rowRef}>
          {movies?.map((item) => (
            <div className="movie-item" key={item.IDmovie || item.IDseries}>
              <img
                src={item.MoviePoster || item.SeriesPoster}
                alt={item.NameMovie || item.SeriesName}
              />
              <p>{item.NameMovie || item.SeriesName}</p>
            </div>
          ))}
        </div>

       
        <button className="scroll-btn right" onClick={scrollRight}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;