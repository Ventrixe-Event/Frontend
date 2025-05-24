import axios from "axios";
import { API_URLS } from "../config/apiConfig";

// Create axios instances for each service
const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor - add auth token
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

  // Response interceptor - handle token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If 401 error and not already retrying
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const { data } = await axios.post(`${API_URLS.AUTH}/auth/refresh`, {
            refreshToken,
          });

          // Save new tokens
          localStorage.setItem("accessToken", data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle refresh failure (e.g., logout user)
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // Redirect to login page or dispatch logout action
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Create API clients for each service
export const authApi = createApiClient(API_URLS.AUTH);
export const eventsApi = createApiClient(API_URLS.EVENTS);
export const bookingsApi = createApiClient(API_URLS.BOOKINGS);
export const paymentsApi = createApiClient(API_URLS.PAYMENTS);
export const notificationsApi = createApiClient(API_URLS.NOTIFICATIONS);
export const categoriesApi = createApiClient(API_URLS.CATEGORIES);
export const invoicesApi = createApiClient(API_URLS.INVOICES);
export const userProfilesApi = createApiClient(API_URLS.USER_PROFILES);
export const feedbackApi = createApiClient(API_URLS.FEEDBACK);
