import { createProduct, getAllProduct, getProductById } from "../models/productModel.js";
import { validateProduct } from "../validators/productValidator.js";

export const addProduct = async (product) => {
    if (!validateProduct(product)) {
        throw new Error(`La structure du produit n'est pas valide`);
    }
  const productId = await createProduct(product);
  return productId;
};

export const getProducts = async (search) => {
  return await getAllProduct(search);
};

export const getProduct = async (id) => {
  const products = await getProductById(id);
  return products;
};