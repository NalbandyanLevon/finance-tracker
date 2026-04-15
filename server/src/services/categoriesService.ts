import {
  CreateCategoryDTO,
  deleteCategory,
  getCategoies,
  getCategoryById,
  ICategory,
  postCategory,
  updateCategory as update,
} from "../models/categoriesModel.js";

export const getAllCategories = async (
  userId: string,
): Promise<ICategory[] | null> => {
  const categories = await getCategoies(userId);
  if (!categories) {
    return null;
  }
  return categories;
};

export const getOneCategory = async (
  id: string,
  userId: string,
): Promise<ICategory | null> => {
  const category = await getCategoryById(id, userId);
  if (!category) {
    return null;
  }
  return category;
};

export const createCategory = async (
  dto: CreateCategoryDTO,
): Promise<ICategory | null> => {
  const newCategory = await postCategory(dto);
  if (!newCategory) {
    return null;
  }
  return newCategory;
};

export const updateCategory = async (
  dto: ICategory,
): Promise<ICategory | null> => {
  const updatedCategory = await update(dto);
  if (!updatedCategory) {
    return null;
  }
  return updatedCategory;
};

export const removeCategory = async (
  id: string,
  userId: string,
): Promise<string | null> => {
  const deletedCategory = await deleteCategory(id, userId);
  if (!deletedCategory) {
    return null;
  }

  return deletedCategory;
};
