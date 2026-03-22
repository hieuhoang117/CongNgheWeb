import express from "express";
import cors from "cors";
import movieRoutes from "./routers/movie.route.js";
import userRoutes from "./routers/user.route.js";
import { connectDB } from "./db.js";
import multer from "multer";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// 👉 connect DB
connectDB();

/* ========= UPLOAD ========= */

// 1. storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// 2. upload
const upload = multer({ storage });

// 3. API upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  const url = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url });
});

// 4. public file
app.use("/uploads", express.static("uploads"));

/* ========= ROUTES ========= */

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

/* ========= SERVER ========= */

app.listen(5000, () => {
  console.log("Server chạy http://localhost:5000");
});