import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getDashboard, logoutUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboard);

router.post('/logout', authMiddleware, logoutUser);

export default router;
