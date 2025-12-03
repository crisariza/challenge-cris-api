import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../types";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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
