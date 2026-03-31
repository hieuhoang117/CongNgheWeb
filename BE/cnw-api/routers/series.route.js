import express from "express";
import { getSeries,getEpisodesBySeriesId,addSeries,deleteSeries,updateSeries,finseries } from "../controllers/series.controller.js";
const router = express.Router();

router.get("/", getSeries);
router.get("/episodes/:id", getEpisodesBySeriesId);
router.post("/", addSeries);
router.put("/:id", updateSeries);
router.get("/name/:name", finseries);
router.delete("/:id", deleteSeries);

export default router;