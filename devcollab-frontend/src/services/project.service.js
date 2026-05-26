import api from "../api/axios";

export const getProjects = async (workspaceId) => {
  const res = await api.get(`/projects/${workspaceId}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const deleteProject = async (projectId) => {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data;
};
