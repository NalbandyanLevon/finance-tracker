import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controller/userController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createUserSchema } from "../validators/userValidator.js";

const router = Router();

router.post("/register", validateMiddleware(createUserSchema), register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
