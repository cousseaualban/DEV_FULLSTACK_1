export const getDashboard = (req, res) => {
  res.status(200).json({
    message: `Bienvenue ${req.user.username}, votre dashboard est prêt.`,
    user: req.user
  });
};
