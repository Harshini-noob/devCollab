import Activity from "../models/activity.model.js";

export const getWorkspaceActivity = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const activities = await Activity.find({
      workspace: workspaceId,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("project", "name");

    res.status(200).json({
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};