import { addProduct, getProduct, getProducts } from "../services/productService.js";

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
    const { search } = req.query
    const products = await getProducts(search);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductController = async (req, res) => {
  try {
    const { id } = req.params

    const product = await getProduct(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}