import Workspace from "../models/workspace.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import Wiki from "../models/wiki.model.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
      owner: req.user._id,

      members: [
        {
          user: req.user._id,
          role: "Owner",
        },
      ],
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    }).populate("members.user", "name email");

    res.status(200).json({
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only workspace owner can delete workspace",
      });
    }

    const projects = await Project.find({
      workspace: workspaceId,
    });

    const projectIds = projects.map((project) => project._id);

    await Task.deleteMany({
      project: {
        $in: projectIds,
      },
    });

    await Wiki.deleteMany({
      project: {
        $in: projectIds,
      },
    });

    await Project.deleteMany({
      workspace: workspaceId,
    });

    await workspace.deleteOne();

    res.status(200).json({
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};