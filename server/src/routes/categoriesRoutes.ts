import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categoriesController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createUpdateCategorySchema } from "../validators/categoryValidator.js";

const router = Router();

router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createUpdateCategorySchema),
  createCategory,
);
router.put(
  "/:id",
  authMiddleware,
  validateMiddleware(createUpdateCategorySchema),
  updateCategory,
);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
