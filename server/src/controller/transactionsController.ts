import type { Response } from "express";
import type { AuthRequest } from "../types.js";
import * as transactionService from "../services/transactionsService.js";

export const getAllTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await transactionService.getTransactions(userId);
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const getTransactionById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transaction = await transactionService.getOneTransaction(id, userId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { amount, type, category_id } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ message: "Invalid type" });
    }

    const createdTransaction = await transactionService.createTransaction({
      amount,
      type,
      user_id: userId,
      category_id: category_id ?? null,
    });

    return res.status(201).json(createdTransaction);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await transactionService.removeTransaction(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
