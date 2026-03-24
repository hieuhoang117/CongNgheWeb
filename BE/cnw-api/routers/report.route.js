import express from "express";
import {getMostViewedMovies,getMostActiveUsers,getSignUpTrends,GetBugReport} from "../controllers/report.controller.js";
const router = express.Router();


router.get("/most-viewed", getMostViewedMovies);
router.get("/most-active", getMostActiveUsers);
router.get("/sign-up-trends", getSignUpTrends);
router.get("/bug-reports", GetBugReport);

export default router;