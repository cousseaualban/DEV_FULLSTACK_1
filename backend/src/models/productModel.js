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