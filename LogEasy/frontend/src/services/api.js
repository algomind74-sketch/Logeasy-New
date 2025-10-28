export const uploadLog = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("/logs/upload", formData);
};