"use client";

import { useMemo, useState } from "react";
import { ITransaction } from "@/types/transactionTypes";

export const useTransactionFilters = (transactions: ITransaction[]) => {
  const [category, setCategory] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const categoryMatch = !category || tx.category === category;
      const typeMatch = !type || tx.type === type;

      return categoryMatch && typeMatch;
    });
  }, [transactions, category, type]);

  return {
    filtered,
    category,
    type,
    setCategory,
    setType,
  };
};
