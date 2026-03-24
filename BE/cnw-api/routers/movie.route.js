import express from "express";
import { getMovies, addMovie,fixMovie,deleteMovie,getMovieByName } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/name/:name", getMovieByName);
router.post("/", addMovie);
router.put("/:id", fixMovie);
router.delete("/:id", deleteMovie);
export default router;