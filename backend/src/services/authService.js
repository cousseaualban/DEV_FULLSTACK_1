import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../models/userModel.js';
import { validatePassword } from '../validators/userValidator.js';

const SALT_ROUNDS = 10;

export const registerUser = async (username, password) => {
  if (!validatePassword(password)) {
    throw new Error('Le mot de passe doit contenir 8-12 caractères, dont une majuscule, un chiffre et un caractère spécial.');
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) throw new Error('Username déjà utilisé');

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const userId = await createUser(username, hashedPassword);
  return userId;
};

export const loginUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error('Identifiants invalides');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Identifiants invalides');

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};
