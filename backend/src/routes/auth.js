import express from 'express';
import { Router } from 'express';
import { 
    register, 
    login, 
    logout, 
    getUser, 
    getOrgUser,  
    deleteUser 
} from '../controllers/auth.js';
import { authorizeRoles } from '../middleware/authmiddleware.js';
import { verifyToken } from '../middleware/authmiddleware.js';
const router = Router();

// Public Routes
router.post('/register', register,authorizeRoles('admin','org','user')); //done
router.post('/login', login);//done
router.post('/logout', logout);//done

// Protected Routes
router.get('/users/:_id',verifyToken,authorizeRoles('admin'), getUser); // Admin can get any user//done
router.get('/orgusers',verifyToken,authorizeRoles('org'), getOrgUser); // HR can get employees under their org//done
router.delete('/users/:id',authorizeRoles('admin'), deleteUser); //

export default router;
