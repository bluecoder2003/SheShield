
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';


export const authenticateUser = async (req, res,next) => {
      
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized, no token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        console.log("User Role from JWT:", req.user.role); // Debugging Log

        if (!roles.includes(req.user.role)) {
            console.log("Access denied for user:", req.user.id);
            return res.status(403).json({ message: "Access denied" });
        }

        next();  // Continue to the next middleware
    };
};




export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Assign decoded user to req
        console.log("✅ Decoded User:", req.user);
        next();
    } catch (error) {
        console.log("❌ JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
