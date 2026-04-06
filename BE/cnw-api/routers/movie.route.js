import express from "express";
import { getMovies, addMovie,fixMovie,deleteMovie,getMovieByName,
    getMovieSeriesByCategory,getMovieById
 } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/name/:name", getMovieByName);
router.post("/", addMovie);
router.put("/:id", fixMovie);
router.delete("/:id", deleteMovie);
router.get("/category/:category", getMovieSeriesByCategory);
router.get("/id/:id", getMovieById);
export default router;