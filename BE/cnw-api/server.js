import express from "express";
import cors from "cors";
import movieRoutes from "./routers/movie.route.js";
import userRoutes from "./routers/user.route.js";
import { connectDB } from "./db.js"; // 👈 thêm

const app = express();
app.use(cors());
app.use(express.json());

// 👉 connect DB trước khi dùng API
connectDB();

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server chạy");
});