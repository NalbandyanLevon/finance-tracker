"use client";

import { FC } from "react";

import { ArrowDown, ArrowUp, Trash } from "lucide-react";

import { useDeleteTransactionMutation } from "@/store/api/transactionsApi";

import { ITransaction } from "@/types/transactionTypes";

import styles from "./TransactionsCard.module.css";

interface IProps {
  transaction: ITransaction;
}

const TransactionCard: FC<IProps> = ({ transaction }) => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction.id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

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
          <h3 className={styles.title}>{transaction.title}</h3>
          <p className={styles.category}>{transaction.category}</p>
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

        <button
          onClick={handleDelete}
          className={styles.deleteBtn}
          title="Delete transaction"
        >
          <Trash />
          Delete transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
