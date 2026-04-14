"use client";

import { FC } from "react";

import Select from "@/shared/ui/Select";

import styles from "./TransactionFilters.module.css";

interface IProps {
  categories: { id: string; name: string }[];
  category?: string;
  type?: string;
  setCategory: (v?: string) => void;
  setType: (v?: string) => void;
}

const TransactionsFilters: FC<IProps> = ({
  categories,
  category,
  type,
  setCategory,
  setType,
}) => {
  return (
    <div className={styles.container}>
      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categories.map((c) => ({
          value: c.name,
          label: c.name,
        }))}
      />

      <Select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { value: "income", label: "Income" },
          { value: "expense", label: "Expense" },
        ]}
      />
    </div>
  );
};

export default TransactionsFilters;
