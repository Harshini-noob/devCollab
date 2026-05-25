import Workspace from "../models/workspace.model.js";

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