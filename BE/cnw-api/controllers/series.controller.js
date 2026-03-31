import e from "cors";
import { sql } from "../db.js";
export const getSeries = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT 
                IDseries,
                SeriesName,
                Description,
                ReleaseYear,
                Country,
                Status,
                ContentID,
                poster
            FROM Series
        `);

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }
};
export const getEpisodesBySeriesId = async (req, res) => {
    try {
        const seriesId = req.params.id;
        const result = await sql.query`
  SELECT 
    e.IDEpisode,
    e.EpisodeName,
    e.EpisodeNumber,
    e.SeasonNumber,
    e.Duration,
    e.film,
    s.poster,
    e.film,
    e.ReleaseDate
    FROM Episode e lEFT JOIN Series s ON e.IDseries = s.IDseries
    WHERE s.IDseries = ${seriesId}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }
};
export const updateSeries = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await sql.query`
      UPDATE Series
      SET 
        SeriesName = ${data.SeriesName},
        Description = ${data.Description},
        ReleaseYear = ${data.ReleaseYear},
        Country = ${data.Country},
        Status = ${data.Status},
        ContentID = ${data.ContentID},
        poster = ${data.poster}
      WHERE IDseries = ${id}
    `;

    res.send("Update thành công");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const finseries = async (req, res) => {
    try {
        const name = req.params.name;
        const result = await sql.query`
            SELECT 
                IDseries, 
                SeriesName,
                Description,
                ReleaseYear,  
                Country,
                Status,
                ContentID,
                poster
            FROM Series
            WHERE SeriesName LIKE ${"%" + name + "%"}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }   
};
export const addSeries = async (req, res) => {
  try {
    const data = req.body;

    await sql.query`
      INSERT INTO Series (SeriesName, Description,ContentID, ReleaseYear, Country, Status, poster)
      VALUES (
        ${data.SeriesName},
        ${data.Description},
        ${data.ContentID},
        ${data.ReleaseYear},
        ${data.Country},
        ${data.Status},
        ${data.poster}
      )
    `;

    res.status(201).send("Series added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};
export const deleteSeries = async (req, res) => {
  try {
    const id = req.params.id;   
    await sql.query`
      DELETE FROM Series WHERE IDseries = ${id}
    `;  
    res.send("Series deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};