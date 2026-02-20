import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getDashboard } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', authenticateJWT, getDashboard);

export default router;
