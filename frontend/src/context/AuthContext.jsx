import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// const API = "http://localhost:5000/api/auth";
const API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists on app load
  useEffect(() => {
    const token = localStorage.getItem("ds_token");
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await axios.get(`${API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.admin);
    } catch {
      localStorage.removeItem("ds_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/signup`, { name, email, password });
      localStorage.setItem("ds_token", res.data.token);
      setUser(res.data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Signup failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem("ds_token", res.data.token);
      setUser(res.data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("ds_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};