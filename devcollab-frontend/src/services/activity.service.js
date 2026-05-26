import api from "../api/axios";

export const getWorkspaceActivity = async (workspaceId) => {
  const res = await api.get(`/activity/${workspaceId}`);
  return res.data;
};
