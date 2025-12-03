import { Card } from "../../types";
import CardModel from "../../models/card";

export const getCardsHandler = async (userId?: number): Promise<Card[]> => {
  // Como en el login no da info el token, no se traen en base a un UserId, por lo tanto se trae todos los cards
  const whereClause = userId ? { userId } : {}; // Si hubiera userId, seria a base de ese userId

  const cards = await CardModel.findAll({
    where: whereClause,
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
