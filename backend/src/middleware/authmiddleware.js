
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';


export const authenticateUser = async (req, res, next) => {
    // Get token from header
    const token = req.header("x-Auth-Token");
  
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      // Verify the token
      const jwtSecretKey = process.env.JWT_SECRET;
      if (!jwtSecretKey) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }
  
      const decoded = jwt.verify(token, jwtSecretKey);
  
      // Check if the token is expired
      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      }
  
      // Find the user by ID
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      // Detailed error logging
      console.error("Error in authentication middleware:", error);
  
      // Check for specific error types
      if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ message: "Invalid auth token." });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      } else {
        return res.status(500).json({ message: "Internal server error." });
      }
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
