import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation error",
          errors: formattedErrors,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
