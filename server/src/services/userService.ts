import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createUser, findUserByEmail, type User } from "../models/userModel.js";

export const registerUser = async (
  email: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashedPassword);
  if (!user) {
    throw new Error("Something gone wrong");
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ id: string; accessToken: string; refreshToken: string }> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not Found");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );

  return { id: user.id, accessToken, refreshToken };
};
