export const getLogStats = async () => {
  return axios.get("/logs/stats");
};