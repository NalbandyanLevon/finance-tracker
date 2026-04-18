import {
  CreateTranactionDTO,
  deleteTransaction,
  findTransactionById,
  findTransactions,
  ITransaction,
  postTransaction,
  updateTransaction,
  UpdateTransactionDTO,
} from "../models/transactionsModel.js";

export const getTransactions = async (
  userId: string,
): Promise<ITransaction[] | null> => {
  const transactions = await findTransactions(userId);
  if (!transactions) {
    return null;
  }
  return transactions;
};

export const getOneTransaction = async (
  id: string,
  userId: string,
): Promise<ITransaction | null> => {
  const transaction = await findTransactionById(id, userId);
  if (!transaction) {
    return null;
  }
  return transaction;
};

export const createTransaction = async (
  dto: CreateTranactionDTO,
): Promise<ITransaction | null> => {
  const newTransaction = await postTransaction(dto);
  if (!newTransaction) {
    return null;
  }
  return newTransaction;
};

export const putTransaction = async (
  dto: UpdateTransactionDTO,
): Promise<ITransaction | null> => {
  const updatedTransaction = await updateTransaction(dto);
  if (!updatedTransaction) {
    return null;
  }
  return updatedTransaction;
};

export const removeTransaction = async (
  id: string,
  userId: string,
): Promise<string | null> => {
  const transactionsWithoutDeleted = await deleteTransaction(id, userId);
  if (!transactionsWithoutDeleted) {
    return null;
  }
  return transactionsWithoutDeleted;
};
