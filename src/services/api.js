/**
 * API Service Configuration - Centralized HTTP client setup for microservices communication
 * Features: Axios interceptors, automatic token refresh, error handling, multi-service support
 * Author: Kim Hammerstad (with API architecture and interceptor patterns guided by Claude 4)
 */

import axios from "axios";
import { API_URLS } from "../config/apiConfig";

// Create configured axios instances for each microservice
// Each service gets its own client with shared interceptor logic
const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor - Automatically adds JWT tokens to outgoing requests
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handles automatic token refresh on 401 errors
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If 401 (Unauthorized) error and not already retrying token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the expired access token
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const { data } = await axios.post(`${API_URLS.AUTH}/auth/refresh`, {
            refreshToken,
          });

          // Update stored tokens with fresh ones
          localStorage.setItem("accessToken", data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - user needs to login again
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // Redirect to login page (TODO: Use React Router navigation instead)
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Create dedicated API clients for each microservice in the distributed system
// This pattern allows each service to have independent configurations if needed
export const authApi = createApiClient(API_URLS.AUTH);
export const eventsApi = createApiClient(API_URLS.EVENTS);
export const bookingsApi = createApiClient(API_URLS.BOOKINGS);
export const paymentsApi = createApiClient(API_URLS.PAYMENTS);
export const notificationsApi = createApiClient(API_URLS.NOTIFICATIONS);
export const categoriesApi = createApiClient(API_URLS.CATEGORIES);
export const invoicesApi = createApiClient(API_URLS.INVOICES);
export const userProfilesApi = createApiClient(API_URLS.USER_PROFILES);
export const feedbackApi = createApiClient(API_URLS.FEEDBACK);
export const galleryApi = createApiClient(API_URLS.GALLERY);
