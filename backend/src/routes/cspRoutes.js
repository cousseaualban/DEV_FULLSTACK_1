import express from "express";
import { saveCSPReport, getCSPReports } from "../models/cspModel.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/csp-report", async (req, res) => {
  const report = req.body["csp-report"];
  if (!report) return res.status(204).end();

  const blockedUri = report["blocked-uri"];
  if (
    blockedUri?.startsWith("chrome-extension://") ||
    blockedUri?.startsWith("moz-extension://")
  ) {
    return res.status(204).end();
  }

  try {
    await saveCSPReport(report);
    console.log("CSP VIOLATION enregistrée :", blockedUri);
    res.status(204).end();
  } catch (err) {
    console.error("Erreur lors de l'enregistrement CSP :", err);
    res.status(500).end();
  }
});

router.get("/admin/csp-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await getCSPReports(50);
    res.json(reports);
  } catch (err) {
    console.error("Erreur récupération CSP reports :", err);
    res.status(500).json({ error: "Impossible de récupérer les CSP reports" });
  }
});

export default router;