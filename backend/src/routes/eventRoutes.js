import express from "express";
import { getAllEvents, getTopEvents } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/top", getTopEvents);

export default router;
