import express from "express";
import { checkEmail,getUsers,addUser,deleteUser,fixUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/check-email", checkEmail);
router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", fixUser);

export default router;