import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

const app = express();

// Behind Vercel's proxy: use the client IP from X-Forwarded-For (rate limit)
app.set("trust proxy", 1);

// Comma-separated list; without it any origin is allowed (no cookies are used)
const allowedOrigins = process.env["CORS_ORIGINS"]
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(helmet());
app.use(cors(allowedOrigins?.length ? { origin: allowedOrigins } : undefined));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Use routes
app.use(routes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
