import { addProduct, getProduct, getProducts, deleteProduct, updateProduct  } from "../services/productService.js";

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


export const deleteProductController = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await deleteProduct(productId);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Produit non trouvé') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du produit' });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const result = await updateProduct(id, newData);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};