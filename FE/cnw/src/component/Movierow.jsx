import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import "./Movierow.css";
import MovieIterm from "./Movie_Iterm";

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
                        <MovieIterm
                            key={item.IDmovie || item.IDseries}
                            movie={item}
                        />
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