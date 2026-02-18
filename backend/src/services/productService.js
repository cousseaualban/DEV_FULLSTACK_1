import { createProduct, getAllProduct } from "../models/productModel.js";
import { validateProduct } from "../validators/productValidator.js";

export const addProduct = async (product) => {
    if (!validateProduct(product)) {
        throw new Error(`La structure du produit n'est pas valide`);
    }
  const productId = await createProduct(product);
  return productId;
};

export const getProducts = async () => {
  const products = await getAllProduct();
  return products;
};