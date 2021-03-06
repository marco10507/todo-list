import axios from "axios";

export default function TaskApi() {
  const apiClient = axios.create({
    baseURL: "https://0rnfy.sse.codesandbox.io/api/"
  });

  return {
    getAll: async (accessToken) => {
      const options = { headers: { Authorization: `Bearer ${accessToken}` } };

      return apiClient.get("/tasks", options);
    },
    save: (payload, accessToken) => {
      return apiClient.post("/tasks", payload);
    },
    update: (payload, taskId, accessToken) => {
      return apiClient.put(`/tasks/${taskId}`, payload);
    },
    delete: (taskId, accessToken) => {
      return apiClient.delete(`/tasks/${taskId}`);
    }
  };
}
