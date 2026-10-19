import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../types";
import { AuthUser, verifyToken } from "../config/auth";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    const errorResponse: ErrorResponse = {
      error: "Authorization required",
      message: "Please provide a valid token in the Authorization header",
    };
    res.status(401).json(errorResponse);
    return;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : authHeader.trim();

  try {
    res.locals.user = verifyToken(token);
    next();
  } catch {
    const errorResponse: ErrorResponse = {
      error: "Invalid token",
      message: "The provided token is not valid or has expired",
    };
    res.status(401).json(errorResponse);
  }
};

// Only valid in routes behind validateToken
export const getAuthUser = (res: Response): AuthUser => {
  return res.locals.user as AuthUser;
};
