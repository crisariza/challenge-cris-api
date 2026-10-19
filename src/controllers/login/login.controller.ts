import { Request, Response } from "express";
import { z } from "zod";
import { ErrorResponse } from "../../types";
import { loginHandler } from "../../handlers/login/login.handler";

const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(128),
});

interface LoginResponse {
  success: boolean;
  data: {
    name: string;
    token: string;
  };
}

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errorResponse: ErrorResponse = {
        error: "Missing required fields",
        message: "A valid email and a password are required",
      };
      res.status(400).json(errorResponse);
      return;
    }

    const result = await loginHandler(parsed.data);

    const loginResponse: LoginResponse = {
      success: true,
      data: result,
    };

    res.status(200).json(loginResponse);
  } catch (error) {
    console.error("Error processing login request:", error);

    if (error instanceof Error && error.message === "Invalid credentials") {
      const errorResponse: ErrorResponse = {
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      };
      res.status(401).json(errorResponse);
      return;
    }

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process login request",
    };
    res.status(500).json(errorResponse);
  }
};
