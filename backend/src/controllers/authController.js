import { registerUser, loginUser } from '../services/authService.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = await registerUser(username, password);
    res.status(201).json({ message: 'Utilisateur créé', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
     if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
     }
      const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
