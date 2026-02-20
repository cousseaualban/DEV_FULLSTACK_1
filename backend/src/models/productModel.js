import pool from '../config/db.js';

export const createProduct = async (product) => {
  const [result] = await pool.execute(
    'INSERT INTO products (label, description, price, category) VALUES (?, ?, ?, ?)',
    [product.label, product.description, product.price, product.category]
  );
  return result.insertId;
};

export const getAllProduct = async (search) => {
  if (search) {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE label LIKE ?',
      [`%${search}%`]
    );
    return rows
  }

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