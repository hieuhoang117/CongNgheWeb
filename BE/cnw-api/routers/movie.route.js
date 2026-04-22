import express from "express";
import { getMovies, addMovie,fixMovie,deleteMovie,getMovieByName,getTopMovie,
    getMovieSeriesByCategory,getMovieById,getNewMovie,getCommingSoonMovie,addMovieView,getMovieSeriesByName
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
router.get("/new", getNewMovie);
router.get("/commingsoon", getCommingSoonMovie);
router.post("/:id/view", addMovieView);
router.get("/search/:name", getMovieSeriesByName);
export default router;