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

export default studyStreakApiService;
