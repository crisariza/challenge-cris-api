import { Card } from "../../types";
import CardModel from "../../models/card";

export const getCardsHandler = async (userId: number): Promise<Card[]> => {
  const cards = await CardModel.findAll({
    where: { userId },
    order: [["id", "ASC"]],
  });

  // Transform Sequelize models to Card interface
  return cards.map((card) => ({
    id: card.id,
    issuer: card.issuer,
    name: card.name,
    expDate: card.expDate,
    lastDigits: card.lastDigits,
    balance: card.balance,
    currency: card.currency,
  }));
};
