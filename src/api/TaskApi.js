import axios from "axios";

export default function TaskApi() {
  const apiClient = axios.create({
    baseURL: "https://3hxp4.sse.codesandbox.io/api"
  });

  return {
    getAll: async (accessToken) => {
      const options = { headers: { Authorization: `Bearer ${accessToken}` } };

      return apiClient.get("/tasks", options);
    },
    save: (payload, accessToken) => {
      const options = { headers: { Authorization: `Bearer ${accessToken}` } };

      return apiClient.post("/tasks", payload, options);
    },
    update: (payload, taskId, accessToken) => {
      const options = { headers: { Authorization: `Bearer ${accessToken}` } };

      return apiClient.put(`/tasks/${taskId}`, payload, options);
    },
    delete: (taskId, accessToken) => {
      const options = { headers: { Authorization: `Bearer ${accessToken}` } };

      return apiClient.delete(`/tasks/${taskId}`, options);
    }
  };
}
