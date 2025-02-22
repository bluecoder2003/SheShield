import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Schema
const AuthSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "Please provide an Employee ID or Organization ID"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.role === "org"; // Password required only for HR
      },
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Prevents password from being returned in queries
    },
    name: {
      type: String,
      required: function () {
        return this.role === "org"; // Required for HR, not for employees
      },
    },
    
    officephoneno: {
      type: String,
      required: function () {
        return this.role === "org"; // Required for HR only
      },
    },
    organizationName: {
      type: String,
      required: true, // Required for all users (HR & employees)
    },
    department: {
      type: String,
      required: function () {
        return this.role === "org"; // Required for HR only
      },
    },
    desg: {
      type: String,
      required: function () {
        return this.role === "org"; // Required for HR only
      },
    },
    officeAddress: {
      type: String,
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

// Hash Password Before Saving (Only if provided)
AuthSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  try {
    this.password = await bcrypt.hash(this.password.trim(), 10); // Trim before hashing
    next();
  } catch (error) {
    next(error);
  }
});

// Compare Password
AuthSchema.methods.comparePassword = async function (password) {
  if (!password) return false; // Prevent comparing undefined passwords
  return await bcrypt.compare(password.trim(), this.password);
};

// Generate JWT Token
AuthSchema.methods.generateToken = function () {
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default mongoose.model("Auth", AuthSchema);
