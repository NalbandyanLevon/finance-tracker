import type { Request, Response } from "express";
import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import type { AuthRequestBody } from "../types.js";

export const register = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    const user = await userService.registerUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const login = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const { id, accessToken, refreshToken } = await userService.loginUser(
      email,
      password,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ id, accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: (error as Error).message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as { userId: string };

    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.ACCESS_SECRET!,
      { expiresIn: "1h" },
    );

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.status(204).send();
};
