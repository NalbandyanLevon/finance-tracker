"use client";

import { useMemo } from "react";
import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import { useGetAllCategoriesQuery } from "@/store/api/categoriesApi";
import { adaptTransaction } from "@/utils/transactionAdapter";

export const useTransactions = () => {
  const { data: transactionsRaw, isLoading } = useGetTransactionsQuery({});
  const { data: categories } = useGetAllCategoriesQuery();

  const transactions = useMemo(() => {
    if (!transactionsRaw) return [];

    return transactionsRaw.map((tx) => adaptTransaction(tx, categories || []));
  }, [transactionsRaw, categories]);

  return {
    transactions,
    isLoading,
    categories: categories || [],
  };
};
