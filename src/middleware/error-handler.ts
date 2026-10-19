import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../types";

export const errorHandler = (
  error: Error & { status?: number; expose?: boolean },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Client errors from body-parser (malformed JSON, body too large)
  if (error.expose && error.status && error.status >= 400 && error.status < 500) {
    const errorResponse: ErrorResponse = {
      error: "Bad request",
      message: error.message,
    };
    res.status(error.status).json(errorResponse);
    return;
  }

  console.error("Unhandled error:", error);
  const errorResponse: ErrorResponse = {
    error: "Internal server error",
    message: "An unexpected error occurred",
  };
  res.status(500).json(errorResponse);
};

export const notFoundHandler = (_req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    error: "Not found",
    message: "The requested endpoint does not exist",
  };
  res.status(404).json(errorResponse);
};
