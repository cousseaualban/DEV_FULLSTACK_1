import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getDashboard, logoutUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', authenticateJWT, getDashboard);

router.post('/logout', authenticateJWT, logoutUser);

export default router;
