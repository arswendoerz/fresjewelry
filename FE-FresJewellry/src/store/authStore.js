import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (
    email,
    password,
    name,
    address,
    phoneNumber,
    profilePicture
  ) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }
      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error registration",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (emailOrPhone, password) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("emailOrPhone", emailOrPhone);
      formData.append("password", password);

      const response = await axios.post(
        `${API_URL}/login`,
        {
          emailOrPhone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        token: response.data.token,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyEmail`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (err) {
      console.log("Auth check failed", err);
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        token: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        isLoading: false,
      });
      throw error;
    }
  },
}));
