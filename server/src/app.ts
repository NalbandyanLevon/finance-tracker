import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/userRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import { env } from "./config/env.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(morgan("dev"));

app.use("/auth", userRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});
