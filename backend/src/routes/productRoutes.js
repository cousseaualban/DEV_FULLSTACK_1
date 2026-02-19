import express from 'express';
import { addProductController, getProductsController } from '../controllers/productController.js';
import csrf from 'csurf';

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.post('/', csrfProtection, addProductController);
router.get('/', getProductsController)

export default router;