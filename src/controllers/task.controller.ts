import { Request, Response } from "express";
import Task from "../models/task.model";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const query: any = {};

    if (search) query.title = { $regex: search as string, $options: "i" };
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      page: pageNum,
      limit: limitNum,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
