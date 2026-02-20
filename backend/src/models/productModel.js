import pool from '../config/db.js';

export const createProduct = async (product) => {
  const [result] = await pool.execute(
    'INSERT INTO products (label, description, price, category) VALUES (?, ?, ?, ?)',
    [product.label, product.description, product.price, product.category]
  );
  return result.insertId;
};

export const getAllProduct = async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM products'
  );
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const deleteProductById = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
  return result; 
};

export const updateProductById = async (id, product) => {
  // Construire dynamiquement les champs à mettre à jour
  const fields = [];
  const values = [];

  if (product.label !== undefined) {
    fields.push('label = ?');
    values.push(product.label);
  }
  if (product.description !== undefined) {
    fields.push('description = ?');
    values.push(product.description);
  }
  if (product.price !== undefined) {
    fields.push('price = ?');
    values.push(product.price);
  }
  if (product.category !== undefined) {
    fields.push('category = ?');
    values.push(product.category);
  }

  if (fields.length === 0) {
    throw new Error('Aucun champ fourni pour la mise à jour');
  }

  const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.execute(sql, values);
  return result;
};