import express from "express";
import{getNotifix, createNotifix, updateNotifix, deleteNotifix,searchNotifix} from "../controllers/notifix.controller.js";

const router = express.Router();

router.get("/", getNotifix);
router.get("/name/:name", searchNotifix);
router.post("/", createNotifix);
router.put("/:id", updateNotifix);
router.delete("/:id", deleteNotifix);
export default router;