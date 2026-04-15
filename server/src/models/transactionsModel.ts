import { pool } from "../db/pool.js";

export interface ITransaction {
  id: string;
  amount: number;
  type: "expense" | "income";
  user_id: string;
  category_id: string;
  created_at: Date;
}

export type CreateTranactionDTO = Omit<ITransaction, "id" | "created_at">;
export type UpdateTransactionDTO = Omit<ITransaction, "user_id" | "created_at">;

export const findTransactions = async (
  userId: string,
): Promise<ITransaction[] | null> => {
  const transactions = await pool.query<ITransaction>(
    "SELECT * FROM transactions WHERE user_id = $1",
    [userId],
  );

  return transactions.rows || null;
};

export const findTransactionById = async (
  id: string,
  userId: string,
): Promise<ITransaction | null> => {
  const transaction = await pool.query<ITransaction>(
    "SELECT * FROM transactions WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  return transaction.rows[0] || null;
};

export const postTransaction = async (
  dto: CreateTranactionDTO,
): Promise<ITransaction | null> => {
  const categoryIdToInsert =
    dto.category_id && dto.category_id.trim() && dto.category_id.trim() !== ""
      ? dto.category_id
      : null;

  const newTransaction = await pool.query<ITransaction>(
    `INSERT INTO transactions (amount, type, user_id, category_id) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, amount, type, user_id, category_id, created_at`,
    [dto.amount, dto.type, dto.user_id, categoryIdToInsert],
  );

  return newTransaction.rows[0] || null;
};

export const putTransaction = async (
  dto: UpdateTransactionDTO,
): Promise<ITransaction | null> => {
  const updatedTransaction = await pool.query<ITransaction>(
    `UPDATE transactions
    SET amount = $1, type = $2, category_id = $3
    WHERE id = $4
    RETURNING *`,
    [dto.amount, dto.type, dto.category_id, dto.id],
  );

  return updatedTransaction.rows[0] || null;
};

export const deleteTransaction = async (
  id: string,
  userId: string,
): Promise<string | null> => {
  const deletedTransaction = await pool.query(
    `DELETE FROM transactions 
       WHERE id = $1 AND user_id = $2 
       RETURNING id`,
    [id, userId],
  );

  return deletedTransaction.rows[0] || null;
};
