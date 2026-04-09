import "./Movie_Top.css";
import MovieItem from "./Movie_Iterm";

const MovieTop = ({ movie, index }) => {
    if (!movie) return null;

    return (
        <div className="movie-top">
            <span className="top-number">{index + 1}</span>
            <MovieItem movie={movie} />
        </div>
    );
};

export default MovieTop;