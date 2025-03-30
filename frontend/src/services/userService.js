import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const updateEmail = async (body) => {
  const response = await axios.put(`${API_URL}/update-email`, body, {
    headers: getAuthHeader(),
  });

  const token = response.data.token;
  if (token) localStorage.setItem("authToken", token);

  return token;
};

export const updatePassword = async (body) => {
  const response = await axios.put(`${API_URL}/update-password`, body, {
    headers: getAuthHeader(),
  });

  const token = response.data.token;
  if (token) localStorage.setItem("authToken", token);

  return token;
};
