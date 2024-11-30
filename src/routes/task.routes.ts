import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { validateTask } from "../middlewares/validation.middleware";
import { checkRole } from "../middlewares/auth.middleware";
import { authenticateToken } from "../middlewares/jwt_auth.middleware";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post(
  "/",
  authenticateToken,
  checkRole("admin"),
  validateTask,
  createTask
);
router.put(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  validateTask,
  updateTask
);
router.delete("/:id", authenticateToken, checkRole("admin"), deleteTask);

export default router;
