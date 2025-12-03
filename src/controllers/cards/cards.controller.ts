import { Request, Response } from "express";
import { ErrorResponse, Card } from "../../types";
import { getCardsHandler } from "../../handlers/cards/cards.handler";

interface CardsResponse {
  success: boolean;
  data: Card[];
}

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await getCardsHandler();

    const cardsResponse: CardsResponse = {
      success: true,
      data: cards,
    };

    res.json(cardsResponse);
  } catch (error) {
    console.error("Error processing get cards request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get cards request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
};
