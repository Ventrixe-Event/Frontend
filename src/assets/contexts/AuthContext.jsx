/**
 * Authentication Context - Global state management for user authentication
 * Uses React useReducer pattern for predictable state updates
 * Currently set up but not actively used - prepared for future auth implementation
 * Author: Kim Hammerstad (with React context patterns guided by Claude 4)
 */

import { createContext, useContext, useReducer } from "react";

// Authentication action types - centralized constants for reducer actions
const AUTH_ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  SIGN_UP: "SIGN_UP",
  SET_USER: "SET_USER",
  SET_ADMIN: "SET_ADMIN",
};

// Initial authentication state - default values for unauthenticated users
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
};

// Auth reducer - handles all authentication state changes
// Follows Redux-style pattern for predictable state updates
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // User data from successful login
      };
    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...initialState, // Reset to initial state on logout
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload, // Update user data without changing auth status
      };
    case AUTH_ACTIONS.SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload, // Toggle admin privileges
      };
    default:
      return state;
  }
};

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component - wraps app to provide authentication state globally
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Sign in function - placeholder for actual authentication logic
  const signIn = async ({ email, password, isPersistent }) => {
    // TODO: Implement actual sign in logic with API call
    // TODO: Store tokens, validate credentials, handle errors
    // On success:
    // dispatch({ type: AUTH_ACTIONS.SIGN_IN, payload: userData })
  };

  // Sign out function - clears authentication state
  const signOut = () => {
    // TODO: Clear tokens from localStorage, notify server
    dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
  };

  // Sign up function - placeholder for user registration
  const signUp = async ({ email }) => {
    // TODO: Implement sign up logic with API call
    // TODO: Handle validation, send confirmation emails, etc.
  };

  // Admin privilege setter - for role-based access control
  const setAdmin = (isAdmin) => {
    dispatch({ type: AUTH_ACTIONS.SET_ADMIN, payload: isAdmin });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state, // Spread all state properties (isAuthenticated, user, isAdmin)
        signIn,
        signOut,
        signUp,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming authentication context
// Provides type safety and ensures component is wrapped in AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
