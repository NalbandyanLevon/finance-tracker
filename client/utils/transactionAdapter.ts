import { ICategory } from "@/types/categoryTypes";
import { IResponseTransaction, ITransaction } from "@/types/transactionTypes";

export const adaptTransaction = (
  transaction: IResponseTransaction,
  categories: ICategory[],
): ITransaction => {
  const category =
    categories.find((c) => c.id === transaction.category_id)?.name || "Unknown";

  return {
    id: transaction.id,
    amount: parseFloat(String(transaction.amount)),
    type: transaction.type,
    categoryName: category,
    categoryId: transaction.category_id,
    date: transaction.created_at,
  };
};
