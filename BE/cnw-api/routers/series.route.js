import express from "express";
import { getSeries,getEpisodesBySeriesId,addSeries,
    deleteSeries,updateSeries,finseries,addEpisode,getseriesByid,getEpisodeById,
deleteEpisode,findEpisode,updateEpisode } from "../controllers/series.controller.js";
const router = express.Router();

router.get("/", getSeries);
router.get("/episodes/series/:id", getEpisodesBySeriesId);
router.post("/", addSeries);
router.put("/:id", updateSeries);
router.get("/name/:name", finseries);
router.delete("/:id", deleteSeries);
router.post("/episodes", addEpisode);
router.delete("/episodes/:id", deleteEpisode);
router.get("/episodes/find/:seriesId/:name", findEpisode);
router.get("/episodes/:id", getEpisodeById);
router.get("/series/:seriesId", getseriesByid);
router.put("/episodes/:id", updateEpisode);

export default router;