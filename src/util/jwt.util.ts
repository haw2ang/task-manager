import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user: { id: string; role: string }) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.verify(token, JWT_SECRET);
};
