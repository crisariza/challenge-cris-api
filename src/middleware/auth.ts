import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../types";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"] as string;

  if (!authHeader) {
    const errorResponse: ErrorResponse = {
      error: "Authorization required",
      message: "Please provide a valid token in the Authorization header",
    };
    res.status(401).json(errorResponse);
    return;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (!token || token.trim() === "") {
    const errorResponse: ErrorResponse = {
      error: "Invalid token",
      message: "The provided token is not valid",
    };
    res.status(401).json(errorResponse);
    return;
  }

  (req as any).token = token;
  next();
};
