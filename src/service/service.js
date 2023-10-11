import axios from "axios";
import jwtDecode from "jwt-decode";

// control API request flow
const apiClient = () => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_API_URL,
    // responseType: "json",
    headers,
  });


  return instance;
};

export default apiClient;
