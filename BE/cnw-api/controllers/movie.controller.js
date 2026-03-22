import { sql } from "../db.js";

export const getMovies = async (req, res) => {
  const result = await sql.query("SELECT * FROM Movie");
  res.json(result.recordset);
};

export const addMovie = async (req, res) => {
  const { NameMovie } = req.body;

  await sql.query`
    INSERT INTO Movie (NameMovie)
    VALUES (${NameMovie})
  `;

  res.json({ message: "Thêm thành công" });
};