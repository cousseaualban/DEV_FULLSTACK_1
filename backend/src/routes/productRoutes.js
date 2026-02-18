import express from 'express';
import { addProductController, getProductsController } from '../controllers/productController.js';

const router = express.Router();

router.post('/', addProductController);
router.get('/', getProductsController)

export default router;