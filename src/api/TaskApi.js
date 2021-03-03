import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://0rnfy.sse.codesandbox.io/api/"
});

export default {
  getAll: () => {
    return apiClient.get("/tasks");
  },
  save: (payload) => {
    return apiClient.post("/tasks", payload);
  },
  update: (payload, taskId) => {
    return apiClient.put(`/tasks/${taskId}`, payload);
  },
  delete: (taskId) => {
    return apiClient.delete(`/tasks/${taskId}`);
  }
};
