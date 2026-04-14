import { ICategory } from "@/types/categoryTypes";
import { IResponseTransaction } from "@/types/transactionTypes";

export const adaptTransaction = (
  transaction: IResponseTransaction,
  categories: ICategory[],
) => {
  const category =
    categories.find((c) => c.id === transaction.category_id)?.name || "Unknown";

  return {
    id: transaction.id,
    title: category,
    amount: parseFloat(transaction.amount),
    type: transaction.type,
    category,
    date: transaction.created_at,
  };
};
