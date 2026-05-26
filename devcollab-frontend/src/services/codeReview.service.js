import api from "../api/axios";

export const reviewCode = async (language, code) => {
  const res = await api.post("/code-review", { language, code });
  return res.data;
};
