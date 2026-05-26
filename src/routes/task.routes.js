import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  addComment,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);

router.get("/:projectId", protect, getProjectTasks);

router.patch("/:taskId/status", protect, updateTaskStatus);

router.post("/:taskId/comments", protect, addComment);

router.delete("/:taskId", protect, deleteTask);

export default router;