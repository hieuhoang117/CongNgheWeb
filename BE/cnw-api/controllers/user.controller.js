import e from "cors";
import { sql } from "../db.js";

export const checkEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await sql.query`
      SELECT Email, Role ,UserID
      FROM Users 
      WHERE Email = ${email} AND PasswordHash = ${password}
    `;

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      return res.json({
        exists: true,
        role: user.Role,
        userId: user.UserID
      });
    } else {
      return res.json({ exists: false });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ exists: false, message: "Lỗi server" });
  }
};
export const getUsers = async (req, res) => {
  const result = await sql.query("SELECT * FROM Users");
  res.json(result.recordset);
};

export const addUser = async (req, res) => {
  try {
    const { UserID
      , FullName
      , Email
      , PasswordHash
      , Phone
      , Role
      , CreatedAt
      , Status } = req.body;

    await sql.query`
      INSERT INTO Users (UserID, FullName, Email, PasswordHash, Phone, Role, CreatedAt, Status)
      VALUES (${UserID}, ${FullName}, ${Email}, ${PasswordHash}, ${Phone}, ${Role}, ${CreatedAt}, ${Status})
    `;

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await sql.query`
      DELETE FROM Users WHERE UserID = ${id}
    `;
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fixUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await sql.query`
      UPDATE Users SET
        FullName = ${data.FullName},
        Email = ${data.Email},
        PasswordHash = ${data.PasswordHash},
        Phone = ${data.Phone},
        Role = ${data.Role},
        Status = ${data.Status}
      WHERE UserID = ${id}
    `;
    res.json({ message: "User updated successfully" });
  }
  catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await sql.query`
      SELECT * FROM Users 
      WHERE Email LIKE '%' + ${email} + '%'
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const getMovieSeriesWatchedByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await sql.query` 
      SELECT *
FROM (
  -- 🎬 MOVIE
  SELECT 
    m.IDmovie,
    NULL AS IDseries,
    m.NameMovie,
    NULL AS SeriesName,
    m.Category,
    m.ReleaseDate,
    m.Director,
    m.Duration,
    m.Country,
    m.Description,
    m.Status,
    m.Poster,
    m.Film,
    MAX(mv.ViewDate) AS LastWatch,
    'Movie' AS Type
  FROM MovieView mv
  JOIN Movie m ON mv.IDmovie = m.IDmovie
  WHERE mv.UserID = ${userId}
  GROUP BY 
    m.IDmovie, m.NameMovie, m.Category, m.ReleaseDate,
    m.Director, m.Duration, m.Country,
    m.Description, m.Status, m.Poster, m.Film

  UNION ALL

  -- 📺 SERIES
  SELECT 
    NULL AS IDmovie,
    s.IDseries,
    NULL AS NameMovie,
    s.SeriesName,
    s.Category,
    s.ReleaseYear AS ReleaseDate,
    NULL AS Director,
    NULL AS Duration,
    s.Country,
    s.Description,
    s.Status,
    s.poster AS Poster,
    NULL AS Film,
    MAX(ev.ViewDate) AS LastWatch,
    'Series' AS Type
  FROM EpisodeView ev
  JOIN Episode e ON ev.IDEpisode = e.IDEpisode
  JOIN Series s ON e.IDseries = s.IDseries
  WHERE ev.UserID = ${userId}
  GROUP BY 
    s.IDseries, s.SeriesName, s.Category,
    s.ReleaseYear, s.Country,
    s.Description, s.Status, s.poster
) AS WatchedContent
ORDER BY LastWatch DESC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};