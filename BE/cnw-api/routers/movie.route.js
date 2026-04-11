import express from "express";
import { getMovies, addMovie,fixMovie,deleteMovie,getMovieByName,getTopMovie,
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
router.get("/top", getTopMovie);
export default router;