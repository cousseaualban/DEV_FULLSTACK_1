import { createProduct, getAllProduct, getProductById, deleteProductById, updateProductById  } from "../models/productModel.js";
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

export const deleteProduct = async (productId) => {
  const id = parseInt(productId, 10);

  const product = await getProductById(id);
  if (!product) {
    throw new Error('Produit non trouvé');
  }

  await deleteProductById(id);

  return { message: 'Produit supprimé avec succès' };
};


export const updateProduct = async (productId, newData) => {
  const id = parseInt(productId, 10);
  const product = await getProductById(id);
  if (!product) throw new Error('Produit non trouvé');

 
  if (newData.price !== undefined && typeof newData.price !== 'number') {
    throw new Error('Price doit être un nombre');
  }

  await updateProductById(id, newData);
  return { message: 'Produit modifié avec succès' };
};