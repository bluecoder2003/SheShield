import Report from "../models/reportmodel.js";
//  Create Report (User Only)
export const createReport = async (req, res) => {
    try {
        if (req.user.role !== "user") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const report = await Report.create({ 
            ...req.body, 
            userId: req.user.id, 
            organizationName: req.user.organizationName // Add organization name
        });

        return res.status(201).json({ success: true, message: "Report submitted successfully", report });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        if (req.user.role !== "user") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        if (report.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You can only delete your own reports" });
        }

        await report.deleteOne();
        return res.status(200).json({ success: true, message: "Report deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Reports (HR Only)
export const getReports = async (req, res) => {
    try {
        if (req.user.role !== "org") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Fetch only reports that belong to the logged-in organization's name
        const reports = await Report.find({ organizationName: req.user.organizationName });

        return res.status(200).json({ success: true, reports });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

