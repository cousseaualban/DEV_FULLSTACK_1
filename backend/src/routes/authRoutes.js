import express from 'express';
import { registerController, loginController, logoutController, profileController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authMiddleware, profileController)
router.post('/logout', authMiddleware, logoutController);

export default router;
