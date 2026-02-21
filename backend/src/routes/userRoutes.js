import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getDashboard } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboard);

export default router;
