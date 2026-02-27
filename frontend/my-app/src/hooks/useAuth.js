import { useState } from "react";
import axios from "../api/auth";
import { useUser } from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";


export const useAuth = () => {
  const [error, setError] = useState(null);
  const { login: contextLogin } = useUser();

  const login = async (username, password) => {
    try {
      const res = await axios.post("/api/user/login", { username, password });
      const token = res.data;

      const decoded = jwtDecode(token);

      const userData = {
        username: decoded.username || decoded.sub || username,
      };

      localStorage.setItem("token", token);
      setError(null);
      contextLogin(userData);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    contextLogin(null);
  };

  return { login, logout, error };
};
