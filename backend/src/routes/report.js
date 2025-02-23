import express from "express";
import { createReport, deleteReport, getReports,uploadEvidence } from "../controllers/report.js";
import { authorizeRoles } from "../middleware/authmiddleware.js";
import { verifyToken } from "../middleware/authmiddleware.js";
const router = express.Router();

// User Routes
router.post("/createreport/:organizationId", uploadEvidence, createReport, async (req, res) => {
    console.log("Received Data:", req.body); // Log the entire request body
}); // done

// HR Routes
router.get("/getorgReport/:id",verifyToken, authorizeRoles('org'), getReports); //needfixes

export default router;
