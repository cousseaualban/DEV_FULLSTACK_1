import express from 'express';
import { addProductController, getProductController, getProductsController } from '../controllers/productController.js';
import csrf from 'csurf';
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.post('/', csrfProtection, addProductController);
router.get('/', getProductsController);
router.get('/:id', getProductController)

export default router;