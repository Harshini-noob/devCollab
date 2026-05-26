import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProject,
  getWorkspaceProjects,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", protect, createProject);

router.get("/:workspaceId", protect, getWorkspaceProjects);

router.delete("/:projectId", protect, deleteProject);

export default router;