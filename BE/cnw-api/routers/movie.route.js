import express from "express";
import { getMovies, addMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);

export default router;