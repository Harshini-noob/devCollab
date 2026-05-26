import Project from "../models/project.model.js";
import Workspace from "../models/workspace.model.js";
import { logActivity } from "../services/activity.service.js";
import Task from "../models/task.model.js";
import Wiki from "../models/wiki.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, workspaceId } = req.body;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "Not a workspace member",
      });
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      createdBy: req.user._id,

      members: [
        {
          user: req.user._id,
          role: "Admin",
        },
      ],
    });

    await logActivity({
      workspace: workspaceId,
      project: project._id,
      user: req.user._id,
      action: "created a project",
      entityType: "Project",
      entityId: project._id,
      metadata: {
        projectName: project.name,
      },
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkspaceProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const projects = await Project.find({
      workspace: workspaceId,
    })
      .populate("createdBy", "name email")
      .populate("members.user", "name email");

    res.status(200).json({
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete project",
      });
    }

    await Task.deleteMany({
      project: projectId,
    });

    await Wiki.deleteMany({
      project: projectId,
    });

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};