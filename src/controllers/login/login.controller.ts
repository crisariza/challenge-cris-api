import { Request, Response } from "express";
import { ErrorResponse } from "../../types";
import { loginHandler } from "../../handlers/login/login.handler";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    name: string;
    token: string;
  };
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      const errorResponse: ErrorResponse = {
        error: "Missing required fields",
        message: "Email and password are required",
      };
      res.status(400).json(errorResponse);
      return;
    }

    const result = await loginHandler({ email, password });

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
