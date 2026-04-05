import { sql } from "../db.js";

export const getMovies = async (req, res) => {
  const result = await sql.query("SELECT * FROM Movie");
  res.json(result.recordset);
};

export const addMovie = async (req, res) => {
  try {
    const {
      NameMovie,
      Category,
      ReleaseDate,
      Director,
      Duration,
      Country,
      Status,
      ContentID,
      Description,
      Poster,
      Film
    } = req.body;

    await sql.query`
      INSERT INTO Movie 
      (NameMovie, Category, ReleaseDate, Director, Duration, Country, Status, Description, Poster, Film)
      VALUES 
      (${NameMovie}, ${Category}, ${ReleaseDate}, ${Director}, ${Duration}, ${Country}, ${Status}, ${Description}, ${Poster}, ${Film})
    `;

    res.json({ message: "Thêm phim thành công" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const fixMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await sql.query`
      UPDATE Movie SET
        NameMovie = ${data.NameMovie},
        Category = ${data.Category},
        ReleaseDate = ${data.ReleaseDate},
        Director = ${data.Director},
        Duration = ${data.Duration},
        Country = ${data.Country},
        Status = ${data.Status},
        ContentID = ${data.ContentID},
        Description = ${data.Description},
        Poster = ${data.Poster},
        Film = ${data.Film}
      WHERE IDmovie = ${id}
    `;

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).send("Lỗi server");
  }
};
export const deleteMovie = async (req, res) => {
  try {
    await sql.query`
      DELETE FROM Movie WHERE IDmovie = ${req.params.id}
    `;
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).send("Lỗi server");
  }
};
export const getMovieByName = async (req, res) => {
  try {
    const name = req.params.name;

    const result = await sql.query`
      SELECT * FROM Movie
      WHERE NameMovie LIKE '%' + ${name} + '%'
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const getMovieSeriesByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const movies = await sql.query`
      SELECT 
        IDmovie,
        NameMovie,
        Poster AS MoviePoster,
        Category,
        Description as movieDescription
      FROM Movie
      WHERE Category = ${category}
    `;

    const series = await sql.query`
      SELECT 
        IDseries,
        SeriesName,
        poster AS SeriesPoster,
        Description as seriesDescription,
        Category
      FROM Series
    `;

    res.json({
      movies: movies.recordset,
      series: series.recordset
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};