import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé : non connecté' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide' });
  }
};

export default authMiddleware;