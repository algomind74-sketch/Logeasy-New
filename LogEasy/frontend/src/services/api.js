import axios from "axios";

// Base URL of your FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ---------------------- 📁 Logs ----------------------

// Upload logs via file
export const uploadLog = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/logs/upload", formData);
};

// Fetch all logs (if exists)
export const getLogs = async () => api.get("/logs");

// ✅ Fetch log statistics
export const getLogStats = async () => api.get("/logs/stats");

// ---------------------- 🤖 AI Insights ----------------------
// The backend route shown was `/ai/`
export const getInsights = async () => api.get("/ai/");

// ---------------------- 📊 Reports ----------------------
// These match the backend swagger exactly:
export const generateReport = async () => api.get("/reports/generate");
export const getReports = async () => api.get("/reports/list");

// ---------------------- ⚙️ System ----------------------
export const getSystemHealth = async () => api.get("/system/health");

export default api;
