import express from 'express';
import { addProductController, deleteProductController, getProductController, getProductsController, updateProductController } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import csrf from 'csurf';
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.post('/', csrfProtection, authMiddleware, addProductController);
router.get('/', getProductsController);
router.get('/:id', getProductController)
router.delete('/:id', authMiddleware, deleteProductController);
router.put('/:id', authMiddleware, updateProductController);

export default router;