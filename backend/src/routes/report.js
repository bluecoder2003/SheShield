import express from "express";
import { createReport, deleteReport, getReports } from "../controllers/report.js";
import { authorizeRoles } from "../middleware/authmiddleware.js";
import { verifyToken } from "../middleware/authmiddleware.js";
const router = express.Router();

// User Routes
router.post("/createreport", verifyToken,authorizeRoles('user'), createReport); // done
// router.post("/deletereport/:id",verifyToken, authorizeRoles('user'), deleteReport); //

// HR Routes
router.get("/getorgReports",verifyToken, authorizeRoles('org'), getReports); //needfixes

export default router;
