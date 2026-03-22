import express from "express";
import { getMovies, addMovie,fixMovie,deleteMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);
router.put("/:id", fixMovie);
router.delete("/:id", deleteMovie);
export default router;