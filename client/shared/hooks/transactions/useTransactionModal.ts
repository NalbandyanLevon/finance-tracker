"use client";

import { useState } from "react";
import { useCreateTransactionMutation } from "@/store/api/transactionsApi";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
} from "@/store/api/categoriesApi";

export const useTransactionModal = (onClose: () => void) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories, refetch } = useGetAllCategoriesQuery();

  const [createTransaction] = useCreateTransactionMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    await createCategory({ name: newCategoryName }).unwrap();
    setNewCategoryName("");
    refetch();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId) return;

    await createTransaction({
      amount: Number(amount),
      type,
      category_id: categoryId,
    }).unwrap();

    onClose();
  };

  return {
    amount,
    type,
    categoryId,
    newCategoryName,

    setAmount,
    setType,
    setCategoryId,
    setNewCategoryName,

    categories: categories || [],

    handleAddCategory,
    handleSubmit,
  };
};
