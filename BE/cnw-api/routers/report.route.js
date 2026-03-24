import express from "express";
import {getMostViewedMovies,getMostActiveUsers,getSignUpTrends,GetBugReport,fixBugReport} from "../controllers/report.controller.js";
const router = express.Router();


router.get("/most-viewed", getMostViewedMovies);
router.get("/most-active", getMostActiveUsers);
router.get("/sign-up-trends", getSignUpTrends);
router.get("/bug-reports", GetBugReport);
router.post("/bug-reports/:id/fix", fixBugReport);
export default router;