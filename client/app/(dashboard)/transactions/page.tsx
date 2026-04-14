"use client";

import TransactionCard from "@/components/Transactions/TransactionsCard/TransactionsCard";

import Loader from "@/shared/ui/Loader/Loader";
import { useTransactions } from "@/shared/hooks/transactions/useTransactions";
import { useTransactionFilters } from "@/shared/hooks/transactions/useTransactionsFilters";

import TransactionsFilters from "@/components/Transactions/TransactionFilters";

import styles from "./TransactionsPage.module.css";

const TransactionsPage = () => {
  const { transactions, isLoading, categories } = useTransactions();

  const { filtered, category, type, setCategory, setType } =
    useTransactionFilters(transactions);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Transactions</h1>
          <p>Manage and track your financial activity</p>
        </div>

        <div className={styles.count}>{filtered.length} transactions</div>
      </div>

      <TransactionsFilters
        categories={categories}
        category={category}
        type={type}
        setCategory={setCategory}
        setType={setType}
      />

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((tx) => <TransactionCard key={tx.id} transaction={tx} />)
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
