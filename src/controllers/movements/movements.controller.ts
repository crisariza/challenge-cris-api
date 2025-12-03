import { Request, Response } from "express";
import { ErrorResponse, Transaction } from "../../types";
import {
  getLastMovementsHandler,
  getAllMovementsHandler,
} from "../../handlers/movements/movements.handler";

interface MovementsResponse {
  success: boolean;
  data: Transaction[];
}

export const getLastMovements = async (req: Request, res: Response) => {
  try {
    const transactions = await getLastMovementsHandler();

    const movementsResponse: MovementsResponse = {
      success: true,
      data: transactions,
    };

    res.json(movementsResponse);
  } catch (error) {
    console.error("Error processing get last movements request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get last movements request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
};

export const getAllMovements = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as
      | "SUS"
      | "CASH_IN"
      | "CASH_OUT"
      | undefined;

    if (filter && !["SUS", "CASH_IN", "CASH_OUT"].includes(filter)) {
      const errorResponse: ErrorResponse = {
        error: "Invalid filter",
        message: "Filter must be one of: SUS, CASH_IN, CASH_OUT",
      };
      res.status(400).json(errorResponse);
      return;
    }

    const transactions = await getAllMovementsHandler(filter);

    const movementsResponse: MovementsResponse = {
      success: true,
      data: transactions,
    };

    res.json(movementsResponse);
  } catch (error) {
    console.error("Error processing get all movements request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get all movements request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
};
