import axios from "axios";

// Set up axios base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_BASE_URL;

// Set up axios interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Sign up new user
  async signUp(email, password, userData) {
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name: userData.name,
        phone: userData.phone,
        userType: userData.userType,
      });

      const { user, token } = response.data.data;

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      const { user, token } = response.data.data;

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userType", user.userType);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Sign out user
  async signOut() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("user");
    } catch (error) {
      throw error;
    }
  },

  // Get current auth token
  getToken() {
    return localStorage.getItem("authToken");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("authToken");
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
  
