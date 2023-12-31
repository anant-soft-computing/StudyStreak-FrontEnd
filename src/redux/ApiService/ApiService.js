import axios from "axios";

// Base URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Axios API Service
const studyStreakApiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

studyStreakApiService.interceptors.request.use((config) => {
  const token = "your_token_here"; // Replace with your actual token

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export default studyStreakApiService;
