import api from "../api/axios";

export const getProjectSummary = async (projectId) => {
  const res = await api.get(`/ai/summary/${projectId}`);
  return res.data;
};

export const detectBlockers = async (projectId) => {
  const res = await api.get(`/ai/blockers/${projectId}`);
  return res.data;
};

export const generateSubtasks = async (feature) => {
  const res = await api.post("/ai/subtasks", { feature });
  return res.data;
};
