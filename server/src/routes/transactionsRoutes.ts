import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controller/transactionsController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createTransactionSchema } from "../validators/transactionValidator.js";

const router = Router();
router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createTransactionSchema),
  createTransaction,
);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
