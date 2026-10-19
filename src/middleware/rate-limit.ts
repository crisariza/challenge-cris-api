import { rateLimit } from "express-rate-limit";
import { ErrorResponse } from "../types";

const tooManyAttempts: ErrorResponse = {
  error: "Too many requests",
  message: "Too many login attempts, please try again later",
};

// In-memory store: on serverless each instance keeps its own counter,
// so this slows down brute force but is not a global limit
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: tooManyAttempts,
});
