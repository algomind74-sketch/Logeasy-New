import axios from "axios";

// Base URL of your FastAPI backend
const API_BASE_URL = "http://localhost:8000";

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

// Fetch all logs
export const getLogs = async () => api.get("/logs");

// Fetch log statistics (✅ your existing function)
export const getLogStats = async () => api.get("/logs/stats");

// ---------------------- 🤖 AI Insights ----------------------
export const getInsights = async () => api.get("/ai/insights");

// ---------------------- 📊 Reports ----------------------
export const generateReport = async () => api.post("/reports/generate");
export const getReports = async () => api.get("/reports");

// ---------------------- ⚙️ System ----------------------
export const getSystemHealth = async () => api.get("/system/health");

export default api;
