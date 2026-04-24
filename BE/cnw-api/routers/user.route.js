import express from "express";
import { checkEmail,getUsers,addUser,deleteUser,fixUser,getUserByEmail,getMovieSeriesWatchedByUser,
    sendOTP,verifyOTP
 } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/check-email", checkEmail);
router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", fixUser);
router.get("/:id/watched", getMovieSeriesWatchedByUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;