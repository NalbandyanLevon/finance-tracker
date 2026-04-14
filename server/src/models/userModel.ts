import { pool } from "../db/pool.js";

export interface User {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<User>("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const result = await pool.query<User>(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, password],
  );
  return result.rows[0] || null;
};
