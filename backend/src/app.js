import express from 'express';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { testConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import statsRoutes from "./routes/statsRoutes.js";
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Le serveur fonctionne !' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

app.use("/api/stats", statsRoutes);


(async () => {
  await testConnection();
})();

export default app;