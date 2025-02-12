import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  const token = response.data.token;

  if (!token) {
    throw new Error("Token not received from server");
  }

  localStorage.setItem("authToken", token);
  return token;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const token = response.data.token;

  if (!token) {
    throw console.error("Token not received from server");
  }

  localStorage.setItem("authToken", response.data.token);
  return token;
};
