import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Le serveur fonctionne !' });
});

(async () => {
  await testConnection();
})();

app.listen(PORT, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${PORT}`);
});