// API base URLs for different microservices
const API_URLS = {
  AUTH: process.env.REACT_APP_AUTH_API_URL || "http://localhost:5001/api",
  EVENTS: process.env.REACT_APP_EVENTS_API_URL || "http://localhost:5002/api",
  BOOKINGS:
    process.env.REACT_APP_BOOKINGS_API_URL || "http://localhost:5003/api",
  PAYMENTS:
    process.env.REACT_APP_PAYMENTS_API_URL || "http://localhost:5004/api",
  NOTIFICATIONS:
    process.env.REACT_APP_NOTIFICATIONS_API_URL || "http://localhost:5005/api",
  CATEGORIES:
    process.env.REACT_APP_CATEGORIES_API_URL || "http://localhost:5006/api",
  INVOICES:
    process.env.REACT_APP_INVOICES_API_URL || "http://localhost:5007/api",
  USER_PROFILES:
    process.env.REACT_APP_USER_PROFILES_API_URL || "http://localhost:5008/api",
  FEEDBACK:
    process.env.REACT_APP_FEEDBACK_API_URL || "http://localhost:5009/api",
};

// Common API endpoints for each service
const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    SIGN_OUT: "/auth/signout",
    REFRESH_TOKEN: "/auth/refresh",
  },
  EVENTS: {
    ALL: "/events",
    BY_ID: (id) => `/events/${id}`,
    CREATE: "/events",
    UPDATE: (id) => `/events/${id}`,
    DELETE: (id) => `/events/${id}`,
  },
  BOOKINGS: {
    ALL: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    CREATE: "/bookings",
    UPDATE: (id) => `/bookings/${id}`,
    DELETE: (id) => `/bookings/${id}`,
  },
  FEEDBACK: {
    ALL: "/feedback",
    BY_ID: (id) => `/feedback/${id}`,
    BY_EVENT: (eventId) => `/feedback/event/${eventId}`,
    CREATE: "/feedback",
    STATS: "/feedback/stats",
    CATEGORIES: "/categories",
  },
  // Add more endpoints as needed
};

export { API_URLS, ENDPOINTS };
