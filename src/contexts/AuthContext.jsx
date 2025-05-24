import { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "../services/authService";

// Define action types
const AUTH_ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Initial auth state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...initialState,
        loading: false,
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext();

// Auth context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

        if (authService.isAuthenticated()) {
          // Here you would typically make an API call to get the current user data
          // For now we'll just set isAuthenticated to true
          dispatch({
            type: AUTH_ACTIONS.SIGN_IN,
            payload: { id: "user-id", name: "User Name" }, // Placeholder user data
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
        }
      } catch (error) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: error.message || "Failed to authenticate",
        });
      }
    };

    checkAuthStatus();
  }, []);

  // Sign in handler
  const signIn = async (email, password, isPersistent = false) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const userData = await authService.signIn(email, password, isPersistent);
      dispatch({ type: AUTH_ACTIONS.SIGN_IN, payload: userData.user });
      return userData;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload:
          error.response?.data?.message || error.message || "Failed to sign in",
      });
      throw error;
    }
  };

  // Sign up handler
  const signUp = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const result = await authService.signUp(userData);
      return result;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload:
          error.response?.data?.message || error.message || "Failed to sign up",
      });
      throw error;
    }
  };

  // Sign out handler
  const signOut = async () => {
    try {
      await authService.signOut();
      dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || "Failed to sign out",
      });
    }
  };

  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
