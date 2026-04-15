import { FormEvent, useState } from "react";

import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/api/categoriesApi";

import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "@/store/api/transactionsApi";

import { ITransaction } from "@/types/transactionTypes";

export const useTransactionModal = (
  onClose: () => void,
  mode: "create" | "update",
  transaction?: ITransaction,
) => {
  const [amount, setAmount] = useState(
    mode === "create" ? "" : transaction?.amount,
  );
  const [type, setType] = useState<"income" | "expense">(
    mode === "create" ? "expense" : transaction!.type,
  );
  const [categoryId, setCategoryId] = useState(transaction?.category);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    await createCategory({ name: newCategoryName }).unwrap();
    setNewCategoryName("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!amount || !categoryId) return;

    if (mode === "create" && type) {
      await createTransaction({
        amount: Number(amount),
        type,
        category_id: categoryId,
      }).unwrap();
    } else if (mode === "update" && transaction && type) {
      await updateTransaction({
        id: transaction.id,
        amount: Number(amount),
        category_id: categoryId,
        type,
      }).unwrap();
      console.log("ashxtav es zibily");
    }

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
    categories,
    handleAddCategory,
    handleSubmit,
  };
};
