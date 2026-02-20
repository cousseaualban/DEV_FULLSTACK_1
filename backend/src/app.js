import express from "express";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cspRoutes from "./routes/cspRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", "http://localhost:3000"],
      styleSrc: ["'self'", "http://localhost:3000"],
      imgSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "http://localhost:5000",
        "http://localhost:3000",
        "ws://localhost:3000",
      ],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'none'"],
      frameAncestors: ["'none'"],
      reportUri: ["/csp-report"],
    },
  }),
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ type: ["application/json", "application/csp-report"] }));
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Le serveur fonctionne !" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/", cspRoutes);
app.use("/api/stats", statsRoutes);
(async () => {
  await testConnection();
})();
export default app;
