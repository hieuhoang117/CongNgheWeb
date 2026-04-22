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
      WHERE Category = ${category}
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
export const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await sql.query`
      SELECT * FROM Movie WHERE IDmovie = ${id}
    `;
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Phim không tồn tại" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const getTopMovie = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT TOP 5 
          m.IDmovie,
          m.NameMovie,
          m.Category,
          m.ReleaseDate,
          m.Director,
          m.Duration,
          m.Country,
          m.Description,
          m.Status,
          m.ContentID,
          m.Poster,
          m.Film,
          ISNULL(v.TotalViews, 0) AS TotalViews
      FROM Movie m
      LEFT JOIN (
          SELECT 
              IDmovie,
              COUNT(*) AS TotalViews
          FROM MovieView
          GROUP BY IDmovie
      ) v ON m.IDmovie = v.IDmovie
      ORDER BY TotalViews DESC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const getNewMovie = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT TOP 20 *
      FROM (
        -- 🎬 MOVIE
        SELECT 
          IDmovie,
          NULL AS IDseries,
          NameMovie,
          NULL AS SeriesName,
          Category,
          ReleaseDate,
          Director,
          Duration,
          Country,
          Description,
          Status,
          Poster,
          Film,
          'Movie' AS Type
        FROM Movie
        WHERE ReleaseDate BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()

        UNION ALL

        -- 📺 SERIES
        SELECT 
          NULL AS IDmovie,
          IDseries,
          NULL AS NameMovie,
          SeriesName,
          Category,
          ReleaseYear AS ReleaseDate,
          NULL AS Director,
          NULL AS Duration,
          Country,
          Description,
          Status,
          poster AS Poster,
          NULL AS Film,
          'Series' AS Type
        FROM Series
        WHERE ReleaseYear BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()
      ) AS NewContent
      ORDER BY ReleaseDate DESC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const getCommingSoonMovie = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT TOP 20 *
FROM (

  SELECT 
    IDmovie,
    NULL AS IDseries,
    NameMovie,
    NULL AS SeriesName,
    Category,
    ReleaseDate,
    Director,
    Duration,
    Country,
    Description,
    Status,
    Poster,
    Film,
    'Movie' AS Type
  FROM Movie
  WHERE ReleaseDate > GETDATE()

  UNION ALL


  SELECT 
    NULL AS IDmovie,
    IDseries,
    NULL AS NameMovie,
    SeriesName,
    Category,
    ReleaseYear AS ReleaseDate, 
    NULL AS Director,
    NULL AS Duration,
    Country,
    Description,
    Status,
    poster AS Poster,
    NULL AS Film,
    'Series' AS Type
  FROM Series
  WHERE ReleaseYear > GETDATE() 
) AS CommingSoonContent
ORDER BY ReleaseDate ASC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};