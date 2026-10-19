import { Transaction } from "../../types";
import TransactionModel, { TransactionType } from "../../models/transaction";

export const getLastMovementsHandler = async (
  userId: number
): Promise<Transaction[]> => {
  const transactions = await TransactionModel.findAll({
    where: { userId },
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
  userId: number,
  filter?: TransactionType
): Promise<Transaction[]> => {
  const transactions = await TransactionModel.findAll({
    where: filter ? { userId, transactionType: filter } : { userId },
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
