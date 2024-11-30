import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "../util/jwt.util";

const users = [
  {
    id: "1",
    username: "admin",
    password: bcrypt.hashSync("adminpass", 10),
    role: "admin",
  },
  {
    id: "2",
    username: "user",
    password: bcrypt.hashSync("userpass", 10),
    role: "user",
  },
];

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
