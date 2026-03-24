import express from "express";
import { getSeries,getEpisodesBySeriesId,addSeries } from "../controllers/series.controller.js";
const router = express.Router();

router.get("/", getSeries);
router.get("/episodes/:id", getEpisodesBySeriesId);
router.post("/", addSeries);
export default router;