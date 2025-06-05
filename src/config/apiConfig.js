/**
 * API Configuration - Centralized endpoint management for microservices architecture
 * Defines base URLs and endpoint patterns for all distributed services
 * Author: Kim Hammerstad (with microservices configuration guidance from Claude 4)
 */

// API base URLs for different microservices in the distributed system
// Mix of local development and Azure-deployed services for the MVP
const API_URLS = {
  AUTH: "http://localhost:5001/api", // Authentication service (local dev)
  EVENTS:
    "https://eventservice-hghxg5bed8gdfebg.centralus-01.azurewebsites.net/api", // Event management (Azure)
  BOOKINGS: "http://localhost:5003/api", // Booking service (planned)
  PAYMENTS: "http://localhost:5004/api", // Payment processing (planned)
  NOTIFICATIONS: "http://localhost:5005/api", // Notification service (planned)
  CATEGORIES: "http://localhost:5006/api", // Category management (planned)
  INVOICES:
    "https://invoiceservice-gmafbqd0gjg8abdf.centralus-01.azurewebsites.net/api", // Invoice management (Azure)
  USER_PROFILES: "http://localhost:5008/api", // User profile service (planned)
  FEEDBACK:
    "https://feedbackservice-a7cpfabadjd8c2dm.centralus-01.azurewebsites.net/api", // Feedback collection (Azure)
  GALLERY:
    "https://galleryservice-afhfd6aveweyauc6.centralus-01.azurewebsites.net/api", // Media management (Azure)
};

// Common API endpoints for each service - RESTful patterns with dynamic parameters
// Organized by service for maintainability and consistency
const ENDPOINTS = {
  // Authentication service endpoints
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    SIGN_OUT: "/auth/signout",
    REFRESH_TOKEN: "/auth/refresh",
  },

  // Event management service endpoints - full CRUD operations
  EVENTS: {
    ALL: "/events",
    BY_ID: (id) => `/events/${id}`,
    BY_CATEGORY: (category) => `/events/category/${category}`,
    BY_STATUS: (status) => `/events/status/${status}`,
    SEARCH: (searchTerm) => `/events/search?searchTerm=${searchTerm}`,
    CREATE: "/events",
    UPDATE: (id) => `/events/${id}`,
    DELETE: (id) => `/events/${id}`,
  },

  // Booking service endpoints (prepared for future implementation)
  BOOKINGS: {
    ALL: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    CREATE: "/bookings",
    UPDATE: (id) => `/bookings/${id}`,
    DELETE: (id) => `/bookings/${id}`,
  },

  // Invoice service endpoints - financial management with filtering options
  INVOICES: {
    ALL: "/invoices",
    BY_ID: (id) => `/invoices/${id}`,
    BY_NUMBER: (number) => `/invoices/number/${number}`,
    BY_STATUS: (status) => `/invoices/status/${status}`,
    BY_EVENT: (eventId) => `/invoices/event/${eventId}`,
    BY_USER: (userId) => `/invoices/user/${userId}`,
    OVERDUE: "/invoices/overdue",
    CREATE: "/invoices",
    UPDATE: (id) => `/invoices/${id}`,
    DELETE: (id) => `/invoices/${id}`,
  },

  // Feedback service endpoints - customer feedback and analytics
  FEEDBACK: {
    ALL: "/feedbacks",
    BY_ID: (id) => `/feedbacks/${id}`,
    BY_EVENT: (eventId) => `/feedbacks/event/${eventId}`,
    CREATE: "/feedbacks",
    STATS: "/feedbacks/statistics",
    CATEGORIES: "/categories",
  },

  // Gallery service endpoints - media management with search and categorization
  GALLERY: {
    ALL: "/gallery",
    BY_ID: (id) => `/gallery/${id}`,
    BY_CATEGORY: (category) => `/gallery/category/${category}`,
    FEATURED: "/gallery/featured",
    SEARCH: (searchTerm) =>
      `/gallery/search?searchTerm=${encodeURIComponent(searchTerm)}`,
    CATEGORIES: "/gallery/categories",
    CREATE: "/gallery",
    UPDATE: (id) => `/gallery/${id}`,
    DELETE: (id) => `/gallery/${id}`,
  },
  // Additional services can be added here as the system grows
};

export { API_URLS, ENDPOINTS };
