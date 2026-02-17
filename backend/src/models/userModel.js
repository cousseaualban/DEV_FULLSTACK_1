import pool from '../config/db.js';

export const createUser = async (username, hashedPassword) => {
  const [result] = await pool.execute(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
  return result.insertId;
};

export const getUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};
