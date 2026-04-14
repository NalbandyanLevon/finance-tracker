"use client";

import { FC } from "react";
import { CircleDollarSign } from "lucide-react";

import Select from "@/shared/ui/Select";
import Input from "@/shared/ui/Input/Input";

import { useTransactionModal } from "@/shared/hooks/transactions/useTransactionModal";

import styles from "./TransactionModal.module.css";

interface IProps {
  onClose: () => void;
}

const TransactionModal: FC<IProps> = ({ onClose }) => {
  const {
    amount,
    type,
    categoryId,
    newCategoryName,
    setAmount,
    setType,
    setCategoryId,
    setNewCategoryName,
    categories,
    handleAddCategory,
    handleSubmit,
  } = useTransactionModal(onClose);

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconBox}>
            <CircleDollarSign color="white" />
          </div>

          <h2 className={styles.title}>Add Transaction</h2>
          <p className={styles.subtitle}>Record a new financial transaction</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Amount</label>
          <input
            className={styles.input}
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Type</label>
          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className={styles.inline}>
            <input
              className={`${styles.input} ${styles.flex1}`}
              placeholder="New category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className={`${styles.btn} ${styles.submit}`}>
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionModal;
