import { addProduct, getProducts } from "../services/productService.js";

export const addProductController = async (req, res) => {
  try {
    const product = req.body;
    const productId = await addProduct(product);
    res.status(201).json({ message: 'Produit créé', productId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(201).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};