import express from "express";
import connectDB from "./config/db.config";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

const PORT = 3000;
const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
