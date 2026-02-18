import express from 'express';
import { addProductController, getProductController, getProductsController } from '../controllers/productController.js';

const router = express.Router();

router.post('/', addProductController);
router.get('/', getProductsController);
router.get('/:id', getProductController)

export default router;