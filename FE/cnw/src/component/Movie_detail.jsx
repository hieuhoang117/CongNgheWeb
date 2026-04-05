import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/name/avengers`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div
      style={{
        color: "white",
        padding: "40px",
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.8), transparent),
          url(${movie.Poster})
        `,
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <h1>{movie.NameMovie}</h1>

      <p><b>Thể loại:</b> {movie.Category}</p>
      <p><b>Đạo diễn:</b> {movie.Director}</p>
      <p><b>Thời lượng:</b> {movie.Duration} phút</p>
      <p><b>Quốc gia:</b> {movie.Country}</p>

      <p style={{ maxWidth: "600px" }}>
        {movie.Description}
      </p>

      
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        ▶ Xem phim
      </button>
    </div>
  );
};

export default MovieDetail;