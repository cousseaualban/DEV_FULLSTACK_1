import express from "express";
import { getStats } from "../controllers/statsController.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/statistiques", getStats(pool));

export default router;