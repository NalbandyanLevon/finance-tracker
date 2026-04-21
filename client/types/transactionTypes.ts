export interface IResponseTransaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  user_id: string;
  category_id: string;
  created_at: Date;
}

export type CreateTransactionDTO = Omit<
  IResponseTransaction,
  "id" | "created_at" | "user_id"
>;

export type UpdateTransactionDTO = Omit<
  IResponseTransaction,
  "created_at" | "user_id"
>;

export interface ITransaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  categoryName: string;
  categoryId: string;
  date: Date;
}
