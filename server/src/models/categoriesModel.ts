import { pool } from "../db/pool.js";

export interface ICategory {
  id: string;
  name: string;
  user_id: string;
}

export type CreateCategoryDTO = Omit<ICategory, "id">;

export const getCategoies = async (
  userId: string,
): Promise<ICategory[] | null> => {
  const categories = await pool.query<ICategory>(
    "SELECT * FROM categories WHERE user_id = $1",
    [userId],
  );

  return categories.rows || null;
};

export const getCategoryById = async (
  id: string,
  userId: string,
): Promise<ICategory | null> => {
  const category = await pool.query<ICategory>(
    "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  return category.rows[0] || null;
};

export const postCategory = async ({
  name,
  user_id,
}: CreateCategoryDTO): Promise<ICategory | null> => {
  const newCategory = await pool.query<ICategory>(
    "INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING name, user_id",
    [name, user_id],
  );

  return newCategory.rows[0] || null;
};

export const updateCategory = async ({
  name,
  user_id,
  id,
}: ICategory): Promise<ICategory | null> => {
  const updatedCategory = await pool.query<ICategory>(
    "UPDATE categories SET name = $1 WHERE user_id = $2  AND id = $3 RETURNING *",
    [name, user_id, id],
  );
  return updatedCategory.rows[0] || null;
};

export const deleteCategory = async (
  id: string,
  userId: string,
): Promise<string | null> => {
  const deletedCategory = await pool.query(
    `DELETE FROM categories
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [id, userId],
  );

  return deletedCategory.rows[0] || null;
};
