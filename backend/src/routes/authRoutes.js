import express from 'express';
import { registerController, loginController, profileController } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authenticateJWT, profileController)

export default router;
