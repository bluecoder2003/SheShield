import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 

export const register = async (req, res) => {
    try {
      const {
        id,
        name,
        password, // Only used for HR (org), ignored for users
        role,
        officeAddress,
        officephoneno,
        organizationName,
        department,
        desg,
      } = req.body;
  
      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }
  
      // Employee (User) Validation - No password field at all
      // if (role === "user") {
      //   if (!id || !organizationName) {
      //     return res.status(400).json({ message: "Employee ID and Organization Name are required for users" });
      //   }
      // }
  
      // HR (Org) Validation - Requires password and other details
      if (role === "org") {
        if (!id || !password || !name || !officeAddress || !officephoneno || !organizationName || !desg) {
          return res.status(400).json({ message: "All fields are required for HR/organization" });
        }
  
        // Check if HR with this email already exists
        const userExists = await User.findOne({ id });
        if (userExists) {
          return res.status(400).json({ message: "HR user with this ID already exists" });
        }
      }
  
      // Check if ID already exists
      const existingUser = await User.findOne({ id });
      if (existingUser) {
        return res.status(400).json({ message: "User with this ID already exists" });
      }
  
      // Hash password only for HR users (org)
      const hashedPassword = role === "org" ? await bcrypt.hash(password, 10) : undefined;
  
      // Create User object without password for users
      const userData = {
        id,
        name,
        role,
        officeAddress,
        officephoneno,
        organizationName,
        department,
        desg,
      };
  
      // Add password only for HR users
      if (role === "org") {
        userData.password = hashedPassword;
      }
  
      // Create User
      const user = await User.create(userData);
  
      return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Something went wrong" });
    }
  };
  
  
  

// export const login = async (req, res) => {
//     try {
//         const { id, password } = req.body;

//         if (!id || !password) {
//             console.log("Missing Fields: ", { id, password });
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const user = await User.findOne({ id: req.body.id }).select("+password");

//         if (!user) {
//             console.log("User not found: ", id);
//             return res.status(404).json({ message: "User not found" });
//         }

//         console.log("Fetched User:", user);
//         console.log("Entered Password:", password.trim());
//         console.log("Stored Hashed Password:", user.password);

//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//             console.log("Password Mismatch: Incorrect Password");
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Create token
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
//         res.cookie("token", token, { httpOnly: true });

//         console.log("Login Successful:", user.id);
//         return res.status(200).json({ message: "User logged in successfully", token, user });

//     } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };
export const login = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        console.log("Missing ID: ", id);
        return res.status(400).json({ message: "ID is required" });
      }
  
      const user = await User.findOne({ id });
  
      if (!user) {
        console.log("User not found: ", id);
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User Found:", user);
  
      const token = jwt.sign(
        { id: user.id, role: user.role,organizationName: user.organizationName },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.setHeader("Authorization", `Bearer ${token}`);
  
      console.log("Login Successful:", user.id);
      return res.status(200).json({
        message: "User logged in successfully",
        token,
        user
      });
  
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: error.message });
    }
  };



  export const logout = async (req,res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

/**
 * @desc    Get a single user (Admin can see any user)
 * @route   GET /api/users/:id
 * @access  Admin Only
 */
export const getUser = async (req,res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const user = await User.findById(req.params._id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all users under HR’s organization
 * @route   GET /api/org-users
 * @access  HR Only
 */
export const getOrgUser = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'org') {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        console.log("Logged-in user's organizationName:", req.user.organizationName); // Debugging

        const users = await User.find({
            organizationName: { $regex: new RegExp(`^${req.user.organizationName}$`, "i") },
            role: 'user'
        });

        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  User themselves
 */
// export const updateUser = async (req,res) => {
//     try {
//         if (!req.user || req.user.id.toString() !== req.params.id && req.user.role !== 'admin') {
//             return res.status(403).json({ success: false, message: 'Unauthorized' });
//         }

//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

//         res.status(200).json({ success: true, message: 'User updated successfully', updatedUser });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

/**
 * @desc    Delete a user (Only Admin can delete)
 * @route   DELETE /api/users/:id
 * @access  Admin Only
 */
export const deleteUser = async (req,res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
