import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const USE_JWT_AUTH = process.env.USE_JWT_AUTH;

export const authenticateToken = (
  req: JwtRequest,
  res: Response,
  next: NextFunction
) => {
  if (!USE_JWT_AUTH || USE_JWT_AUTH === "false") {
    console.log("JWT authentication is disabled");
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Token required" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as UserPayload;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export interface JwtRequest extends Request {
  user?: UserPayload;
}

interface UserPayload {
  id: string;
  username: string;
  password: string;
  role: string;
}
