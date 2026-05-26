import api from "../api/axios";

export const getTasks = async (projectId) => {
  const res = await api.get(`/tasks/${projectId}`);
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await api.patch(`/tasks/${taskId}/status`, { status });
  return res.data;
};

export const addComment = async (taskId, text) => {
  const res = await api.post(`/tasks/${taskId}/comments`, { text });
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};
