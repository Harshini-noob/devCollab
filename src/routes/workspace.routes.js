import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createWorkspace,
  getUserWorkspaces,
} from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/", protect, createWorkspace);

router.get("/", protect, getUserWorkspaces);

export default router;