// API base URLs for different microservices
const API_URLS = {
  AUTH: "http://localhost:5001/api",
  EVENTS: "http://localhost:5002/api",
  BOOKINGS: "http://localhost:5003/api",
  PAYMENTS: "http://localhost:5004/api",
  NOTIFICATIONS: "http://localhost:5005/api",
  CATEGORIES: "http://localhost:5006/api",
  INVOICES: "http://localhost:5007/api",
  USER_PROFILES: "http://localhost:5008/api",
  FEEDBACK: "http://localhost:5110/api",
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
    ALL: "/feedbacks",
    BY_ID: (id) => `/feedbacks/${id}`,
    BY_EVENT: (eventId) => `/feedbacks/event/${eventId}`,
    CREATE: "/feedbacks",
    STATS: "/feedbacks/statistics",
    CATEGORIES: "/categories",
  },
  // Add more endpoints as needed
};

export { API_URLS, ENDPOINTS };
