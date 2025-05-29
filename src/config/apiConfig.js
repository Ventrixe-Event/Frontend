// API base URLs for different microservices
const API_URLS = {
  AUTH: "http://localhost:5001/api",
  EVENTS:
    "https://eventservice-hghxg5bed8gdfebg.centralus-01.azurewebsites.net/api",
  BOOKINGS: "http://localhost:5003/api",
  PAYMENTS: "http://localhost:5004/api",
  NOTIFICATIONS: "http://localhost:5005/api",
  CATEGORIES: "http://localhost:5006/api",
  INVOICES:
    "https://invoiceservice-gmafbqd0gjg8abdf.centralus-01.azurewebsites.net/api",
  USER_PROFILES: "http://localhost:5008/api",
  FEEDBACK:
    "https://feedbackservice-a7cpfabadjd8c2dm.centralus-01.azurewebsites.net/api",
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
    BY_CATEGORY: (category) => `/events/category/${category}`,
    BY_STATUS: (status) => `/events/status/${status}`,
    SEARCH: (searchTerm) => `/events/search?searchTerm=${searchTerm}`,
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
