import { registerUser, loginUser } from '../services/authService.js';

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
    const token = await loginUser(username, password);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Déconnexion réussie. Supprimez le token côté client."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la déconnexion"
    });
  }
};


