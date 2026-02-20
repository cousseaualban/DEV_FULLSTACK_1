import express from 'express';
import { registerController, loginController, logoutController, profileController } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authenticateJWT, profileController)
router.post('/logout', authenticateJWT, logoutController);

export default router;
