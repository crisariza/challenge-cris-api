import { Transaction } from "../../types";
import TransactionModel from "../../models/transaction";

export const getLastMovementsHandler = async (
  userId?: number
): Promise<Transaction[]> => {
  // Misma logica que el card
  const whereClause = userId ? { userId } : {};

  const transactions = await TransactionModel.findAll({
    where: whereClause,
    order: [["date", "DESC"]],
    limit: 5,
  });

  return transactions.map((transaction) => ({
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    transactionType: transaction.transactionType,
    date: transaction.date.toISOString(),
  }));
};

export const getAllMovementsHandler = async (
  filter?: "SUS" | "CASH_IN" | "CASH_OUT",
  userId?: number
): Promise<Transaction[]> => {
  // Misma logica que el card
  const whereClause: any = userId ? { userId } : {};

  if (filter) {
    whereClause.transactionType = filter;
  }

  const transactions = await TransactionModel.findAll({
    where: whereClause,
    order: [["date", "DESC"]],
  });

  return transactions.map((transaction) => ({
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    transactionType: transaction.transactionType,
    date: transaction.date.toISOString(),
  }));
};
