import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 

export const register = async (req, res) => {
  try {
    const { id,officephoneno,organizationName,department,desg,officeAddress,role } = req.body;

    if (!id || !officephoneno || !organizationName || !officeAddress || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ id });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      id,
      officephoneno,
      organizationName,
      department,
      desg,
      officeAddress,
      role
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create token including the _id
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
    });

    return res.status(200).json({ 
      message: "User logged in successfully", 
      token, 
      user: { 
        _id: user._id, 
        id: user.id, 
        officephoneno: user.officephoneno, 
        organizationName: user.organizationName, 
        department: user.department, 
        desg: user.desg, 
        officeAddress: user.officeAddress, 
        role: user.role 
      } 
    });

  } catch (error) {
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


export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await User.find({ role: "org" }).select("-password");
    res.status(200).json({ success: true, data: organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error); // Log the error
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

