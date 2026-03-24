import { sql } from "../db.js";

export const getMostViewedMovies = async (req, res) => {
    try {
        const result = await sql.query`SELECT m.NameMovie, COUNT(v.ID) AS Views
FROM Movie m
LEFT JOIN MovieView v ON m.IDmovie = v.IDmovie
GROUP BY m.NameMovie
ORDER BY Views DESC`;

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }
};

export const getMostActiveUsers = async (req, res) => {
    try {
        const result = await sql.query`SELECT u.FullName, COUNT(v.ID) AS Views
FROM Users u
LEFT JOIN MovieView v ON u.UserID = v.UserID
GROUP BY u.FullName
ORDER BY Views DESC`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }
};
export const getSignUpTrends = async (req, res) => {
    try {
        const result = await sql.query`SELECT 
    FORMAT(CreatedAt, 'yyyy-MM') AS Thang,
    COUNT(*) AS SoLuongUser
FROM Users
WHERE CreatedAt >= DATEADD(MONTH, -2, GETDATE())
GROUP BY FORMAT(CreatedAt, 'yyyy-MM')
ORDER BY Thang`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server");
    }
};
