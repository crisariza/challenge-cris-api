import { Request, Response } from "express";
import { z } from "zod";
import { ErrorResponse, Transaction } from "../../types";
import {
  getLastMovementsHandler,
  getAllMovementsHandler,
} from "../../handlers/movements/movements.handler";
import { getAuthUser } from "../../middleware/auth";

const filterSchema = z.enum(["SUS", "CASH_IN", "CASH_OUT"]).optional();

interface MovementsResponse {
  success: boolean;
  data: Transaction[];
}

export const getLastMovements = async (_req: Request, res: Response) => {
  try {
    const transactions = await getLastMovementsHandler(getAuthUser(res).id);

    const movementsResponse: MovementsResponse = {
      success: true,
      data: transactions,
    };

    res.status(200).json(movementsResponse);
  } catch (error) {
    console.error("Error processing get last movements request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get last movements request",
    };
    res.status(500).json(errorResponse);
  }
};

export const getAllMovements = async (req: Request, res: Response) => {
  try {
    const filter = filterSchema.safeParse(req.query.filter);

    if (!filter.success) {
      const errorResponse: ErrorResponse = {
        error: "Invalid filter",
        message: "Filter must be one of: SUS, CASH_IN, CASH_OUT",
      };
      res.status(400).json(errorResponse);
      return;
    }

    const transactions = await getAllMovementsHandler(
      getAuthUser(res).id,
      filter.data
    );

    const movementsResponse: MovementsResponse = {
      success: true,
      data: transactions,
    };

    res.status(200).json(movementsResponse);
  } catch (error) {
    console.error("Error processing get all movements request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get all movements request",
    };
    res.status(500).json(errorResponse);
  }
};
