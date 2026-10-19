import { Request, Response } from "express";
import { ErrorResponse, Card } from "../../types";
import { getCardsHandler } from "../../handlers/cards/cards.handler";
import { getAuthUser } from "../../middleware/auth";

interface CardsResponse {
  success: boolean;
  data: Card[];
}

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await getCardsHandler(getAuthUser(res).id);

    const cardsResponse: CardsResponse = {
      success: true,
      data: cards,
    };

    res.status(200).json(cardsResponse);
  } catch (error) {
    console.error("Error processing get cards request:", error);

    const errorResponse: ErrorResponse = {
      error: "Internal server error",
      message: "Failed to process get cards request",
    };
    res.status(500).json(errorResponse);
  }
};
