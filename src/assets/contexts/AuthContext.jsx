import { createContext, useContext, useReducer } from "react";

// Define action types
const AUTH_ACTIONS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  SIGN_UP: "SIGN_UP",
  SET_USER: "SET_USER",
  SET_ADMIN: "SET_ADMIN",
};

// Initial auth state
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...initialState,
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_ACTIONS.SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async ({ email, password, isPersistent }) => {
    // Implement sign in logic here
    // On success:
    // dispatch({ type: AUTH_ACTIONS.SIGN_IN, payload: userData })
  };

  const signOut = () => {
    dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
  };

  const signUp = async ({ email }) => {
    // Implement sign up logic here
  };

  const setAdmin = (isAdmin) => {
    dispatch({ type: AUTH_ACTIONS.SET_ADMIN, payload: isAdmin });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
