const express = require("express");
const cors = require("cors");
const { sql, connectDB } = require("./db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB khi chạy server
connectDB();

// API lấy dữ liệu
app.get("/api/movie", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Movie");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/", (req, res) => {
    res.send("API đang chạy");
});
// API thêm dữ liệu
app.post("/api/movie2", async (req, res) => {
    try {
        const { NameMovie } = req.body;

        await sql.query`
            INSERT INTO Movie (NameMovie)
            VALUES (${NameMovie})
        `;

        res.json({ message: "Thêm thành công" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;

  const result = await sql.query`
    SELECT * FROM Users WHERE Email = ${email}
  `;

  if (result.recordset.length > 0) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});
app.listen(5000, () => {
    console.log("Server chạy http://localhost:5000");
});