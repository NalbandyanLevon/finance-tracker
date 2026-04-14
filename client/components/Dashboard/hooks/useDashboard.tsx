"use client";

import { useMemo } from "react";

import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import { useGetAllCategoriesQuery } from "@/store/api/categoriesApi";

import { adaptTransaction } from "@/utils/transactionAdapter";

export const useDashboardData = () => {
  const { data: transactionsRaw } = useGetTransactionsQuery({});
  const { data: categories } = useGetAllCategoriesQuery();

  const result = useMemo(() => {
    const transactions =
      transactionsRaw?.map((tx) => adaptTransaction(tx, categories || [])) ||
      [];

    const incomeExpenseMap: Record<
      string,
      { income: number; expense: number }
    > = {};

    const categoryMap: Record<string, number> = {};
    const monthMap: Record<number, { income: number; expense: number }> = {};

    let income = 0;
    let expense = 0;

    for (const tx of transactions) {
      const date = new Date(tx.date);
      const day = date.toISOString().split("T")[0];
      const month = date.getMonth();

      if (tx.type === "income") income += tx.amount;
      else expense += tx.amount;

      if (!incomeExpenseMap[day]) {
        incomeExpenseMap[day] = { income: 0, expense: 0 };
      }
      incomeExpenseMap[day][tx.type] += tx.amount;

      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;

      if (!monthMap[month]) {
        monthMap[month] = { income: 0, expense: 0 };
      }
      monthMap[month][tx.type] += tx.amount;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      transactions,

      incomeExpenseData: Object.entries(incomeExpenseMap).map(
        ([date, values]) => ({
          date,
          ...values,
        }),
      ),

      categoryData: Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      })),

      monthlyData: Object.entries(monthMap).map(([m, values]) => ({
        month: months[Number(m)],
        ...values,
      })),

      totals: {
        income,
        expense,
        balance: income - expense,
      },
    };
  }, [transactionsRaw, categories]);

  return result;
};
