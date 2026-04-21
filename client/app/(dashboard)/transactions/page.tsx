"use client";

import { useState } from "react";

import Loader from "@/shared/ui/Loader/Loader";
import TransactionCard from "@/components/Transactions/TransactionsCard";
import TransactionsFilters from "@/components/Transactions/TransactionFilters";
import TransactionModal from "@/components/Transactions/TransactionsModal";
import ConfirmModal from "@/shared/ui/ConfirmModal";

import { useTransactions } from "@/shared/hooks/transactions/useTransactions";
import { useTransactionFilters } from "@/shared/hooks/transactions/useTransactionsFilters";
import { ITransaction } from "@/types/transactionTypes";

import styles from "./TransactionsPage.module.css";

const TransactionsPage = () => {
  const { transactions, isLoading, categories, deleteTransaction } =
    useTransactions();

  const { filtered, category, type, setCategory, setType } =
    useTransactionFilters(transactions);

  const [createOpen, setCreateOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedTxId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTxId) return;

    await deleteTransaction(selectedTxId).unwrap();

    setConfirmOpen(false);
    setSelectedTxId(null);
  };

  const handleEdit = (tx: ITransaction) => {
    setSelectedTx(tx);
    setUpdateOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Transactions</h1>

        <div className={styles.rightPanel}>
          <div className={styles.count}>{filtered.length} transactions</div>

          <button onClick={() => setCreateOpen(true)} className={styles.addBtn}>
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

      {createOpen && (
        <TransactionModal mode="create" onClose={() => setCreateOpen(false)} />
      )}

      {updateOpen && selectedTx && (
        <TransactionModal
          mode="update"
          transaction={selectedTx}
          onClose={() => setUpdateOpen(false)}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          title="Delete transaction?"
          description="This action cannot be undone."
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className={styles.list}>
        {filtered.map((tx: ITransaction) => (
          <TransactionCard
            key={tx.id}
            transaction={tx}
            id={tx.id}
            onDelete={handleDeleteClick}
            onEdit={() => handleEdit(tx)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
