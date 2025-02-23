import Report from "../models/reportmodel.js";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Setup (Temporary Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('evidence'); // Accept multiple files

export const createReport = async (req, res) => {
    try {
        const { organizationId } = req.params; // Get organization ID from URL
        if (!organizationId) {
            return res.status(400).json({ success: false, message: "Organization ID is required" });
        }

        let uploadedFiles = [];

        // Check if evidence files are uploaded
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                try {
                    const result = await cloudinary.uploader.upload_stream(
                        { resource_type: 'auto', folder: '' }, // Folder in Cloudinary
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary Upload Error:', error);
                                return null;
                            }
                            console.log(result.secure_url);
                            return result.secure_url;
                            
                        }
                    ).end(file.buffer); // Upload file buffer
                    return result;
                } catch (error) {
                    console.error('Cloudinary Upload Failed:', error);
                    return null;
                }
            });

            uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean);
        }

        // Create Report in Database
        const report = await Report.create({
            ...req.body,
            organizationId,
            // Store Cloudinary URLs in DB
        });
        // console.log(req.body);
        return res.status(201).json({ success: true, message: "Report submitted successfully", report });

    } catch (error) {
        console.error('Report Submission Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Middleware to handle file uploads
export const uploadEvidence = upload;


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

// Get Reports (HR Only)
export const getReports = async (req, res) => {
    try {
        console.log("🔹 Incoming Request - User:", req.user); 

        if (!req.user || req.user.role !== "org") {
            console.error("Access Denied - User is not an org or missing");
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        console.log("Fetching Reports for orgid:", req.user.id);
        
        const reports = await Report.find({ orgid: req.user.id });

        if (reports.length === 0) {
            console.warn(" No reports found for orgid:", req.user.orgid);
        }

        

        return res.status(200).json({ success: true, reports });

    } catch (error) {
        
        return res.status(500).json({ success: false, message: error.message });
    }
};




