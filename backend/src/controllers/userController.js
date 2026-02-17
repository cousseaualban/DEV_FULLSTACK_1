export const getDashboard = (req, res) => {
  res.status(200).json({
    message: `Bienvenue ${req.user.username}, votre dashboard est prêt.`,
    user: req.user
  });
};

export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie. Supprimez le token côté client.' });
};
