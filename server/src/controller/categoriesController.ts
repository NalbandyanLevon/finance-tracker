import type { Response } from "express";
import { AuthRequest } from "../types.js";
import * as categoriesService from "../services/categoriesService.js";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const categories = await categoriesService.getAllCategories(userId);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const getCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const category = await categoriesService.getOneCategory(id, userId);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Invalid name" });
    }

    const allCategories = await categoriesService.getAllCategories(userId);
    if (allCategories?.some((cat) => cat.name === name)) {
      return res.status(400).json({ message: "Existing name" });
    }

    const createdCategory = await categoriesService.createCategory({
      name,
      user_id: userId,
    });

    return res.status(201).json(createdCategory);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ mesage: "Unauthorized" });
    }

    const { name } = req.body;
    const { id } = req.params;

    const updatedCategory = await categoriesService.updateCategory({
      name,
      id,
      user_id: userId,
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await categoriesService.removeCategory(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
