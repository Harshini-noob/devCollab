import Activity from "../models/activity.model.js";

export const logActivity = async ({
  workspace,
  project,
  user,
  action,
  entityType,
  entityId,
  metadata = {},
}) => {
  await Activity.create({
    workspace,
    project,
    user,
    action,
    entityType,
    entityId,
    metadata,
  });
};