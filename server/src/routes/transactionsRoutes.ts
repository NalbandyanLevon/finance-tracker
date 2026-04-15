import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controller/transactionsController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createUpdateTransactionSchema } from "../validators/transactionValidator.js";

const router = Router();
router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createUpdateTransactionSchema),
  createTransaction,
);
router.put(
  "/:id",
  authMiddleware,
  validateMiddleware(createUpdateTransactionSchema),
  updateTransaction,
);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
