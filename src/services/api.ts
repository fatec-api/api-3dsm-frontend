import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082", // futuro backend
  timeout: 5000,
});

export default api;