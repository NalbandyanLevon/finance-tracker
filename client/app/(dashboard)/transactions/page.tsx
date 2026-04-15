"use client";

import { useState } from "react";

import TransactionCard from "@/components/Transactions/TransactionsCard/TransactionsCard";
import TransactionsFilters from "@/components/Transactions/TransactionFilters";
import TransactionModal from "@/components/Transactions/TransactionsModal";

import Loader from "@/shared/ui/Loader/Loader";
import { useTransactions } from "@/shared/hooks/transactions/useTransactions";
import { useTransactionFilters } from "@/shared/hooks/transactions/useTransactionsFilters";

import { ITransaction } from "@/types/transactionTypes";

import styles from "./TransactionsPage.module.css";

const TransactionsPage = () => {
  const { transactions, isLoading, categories, deleteTransaction } =
    useTransactions();

  const { filtered, category, type, setCategory, setType } =
    useTransactionFilters(transactions);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (tx: ITransaction) => {
    setSelectedTx(tx);
    setUpdateModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Transactions</h1>
          <p>Manage and track your financial activity</p>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.count}>{filtered.length} transactions</div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className={styles.addBtn}
          >
            <span className={styles.plus}>+</span>
            Add Transaction
          </button>
        </div>
      </div>

      <TransactionsFilters
        categories={categories}
        category={category}
        type={type}
        setCategory={setCategory}
        setType={setType}
      />

      {createModalOpen && (
        <TransactionModal
          mode="create"
          onClose={() => setCreateModalOpen(false)}
        />
      )}

      {updateModalOpen && selectedTx && (
        <TransactionModal
          mode="update"
          transaction={selectedTx}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((tx) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              id={tx.id}
              onDelete={handleDelete}
              onEdit={() => handleEdit(tx)}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>No transactions found</p>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
