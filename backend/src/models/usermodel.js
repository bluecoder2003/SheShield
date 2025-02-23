import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Schema
const AuthSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    id: {
      type: String,
      required: [true, "Please provide an Employee ID or Organization ID"],
      unique: true,
    },
    
    
    officephoneno: {
      type: Number,
      required: true,
    },
    organizationName: {
      type: String,
      required: true, // Required for all users (HR & employees)
      unique:true,
    },
    department: {
      type: String,
      
    },
    desg: {
      type: String,
      
    },
    officeAddress: {
      type: String,
      require:true,
    },
    role: {
      type: String,
      enum: ["admin", "org", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);



// Generate JWT Token
AuthSchema.methods.generateToken = function () {
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default mongoose.model("Auth", AuthSchema);
