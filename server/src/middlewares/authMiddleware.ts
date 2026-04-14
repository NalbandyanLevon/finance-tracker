import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { AuthRequest, JwtUserPayload } from "../types.js";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not set" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
    ) as JwtUserPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
