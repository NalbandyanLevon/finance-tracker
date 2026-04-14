import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} from "../controller/categoriesController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createCategorySchema } from "../validators/categoryValidator.js";

const router = Router();

router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createCategorySchema),
  createCategory,
);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
