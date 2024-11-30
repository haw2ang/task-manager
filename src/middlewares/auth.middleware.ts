import { Response, NextFunction } from "express";
import { JwtRequest } from "./jwt_auth.middleware";
import dotenv from "dotenv";
dotenv.config();

const USE_JWT_AUTH = process.env.USE_JWT_AUTH;

export const checkRole = (role: string) => {
  return (req: JwtRequest, res: Response, next: NextFunction) => {
    let userRole;

    if (USE_JWT_AUTH === "false") {
      userRole = req.user ? req.user.role : undefined;
    } else {
      userRole = req.headers["x-role"];
    }

    if (!userRole || userRole !== role) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
};
