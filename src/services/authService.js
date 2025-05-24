import { authApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

/**
 * Authentication service for user login, registration, and logout operations
 */
export const authService = {
  /**
   * Sign in a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {boolean} isPersistent - Whether to keep the user logged in
   * @returns {Promise<Object>} User data with tokens
   */
  signIn: async (email, password, isPersistent = false) => {
    try {
      const response = await authApi.post(ENDPOINTS.AUTH.SIGN_IN, {
        email,
        password,
        isPersistent,
      });

      // Store tokens
      localStorage.setItem("accessToken", response.data.accessToken);
      if (isPersistent && response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      console.error("Sign in error:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user data
   */
  signUp: async (userData) => {
    try {
      const response = await authApi.post(ENDPOINTS.AUTH.SIGN_UP, userData);
      return response.data;
    } catch (error) {
      console.error("Sign up error:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  signOut: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authApi.post(ENDPOINTS.AUTH.SIGN_OUT, { refreshToken });
      }
    } catch (error) {
      console.error("Sign out error:", error.response?.data || error.message);
    } finally {
      // Always clear local storage tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  /**
   * Check if user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};
