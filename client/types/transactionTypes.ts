export interface IResponseTransaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  user_id: string;
  category_id: string;
  created_at: Date;
}

export type CreateTransactionDTO = Omit<IResponseTransaction, "id" | "created_at" | "user_id">;

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
}

