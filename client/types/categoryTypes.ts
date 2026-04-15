export interface ICategory {
  id: string;
  name: string;
  userId: string;
}

export type CreateCategoryDTO = Pick<ICategory, "name">;
export type UpdateCategoryDTO = Omit<ICategory, "userId">;
