"use client";

import { FC } from "react";
import { ArrowDown, ArrowUp, Trash2, Pencil } from "lucide-react";

import { ITransaction } from "@/types/transactionTypes";

import styles from "./TransactionsCard.module.css";

interface IProps {
  transaction: ITransaction;
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TransactionCard: FC<IProps> = ({ transaction, id, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div
          className={`${styles.iconBox} ${
            transaction.type === "income" ? styles.income : styles.expense
          }`}
        >
          {transaction.type === "income" ? <ArrowUp /> : <ArrowDown />}
        </div>

        <div>
          <h3 className={styles.title}>{transaction.categoryName}</h3>
          <p className={styles.date}>
            {new Date(transaction.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <span
          className={`${styles.amount} ${
            transaction.type === "income"
              ? styles.amountIncome
              : styles.amountExpense
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount}$
        </span>

        <div className={styles.actions}>
          <button
            onClick={() => onEdit(id)}
            className={`${styles.btn} ${styles.edit}`}
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(id)}
            className={`${styles.btn} ${styles.delete}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
