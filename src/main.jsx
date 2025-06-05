/**
 * Main entry point for the Ventixe React application
 * Sets up the React 18 root with necessary providers for routing and authentication
 * Author: Kim Hammerstad (with architectural guidance from Claude 4)
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./assets/contexts/AuthContext";
import App from "./App.jsx";
import "./App.css";

// Create React 18 root and render app with provider hierarchy
// StrictMode: Enables additional development warnings and checks
// BrowserRouter: Enables client-side routing for SPA navigation
// AuthProvider: Wraps app with authentication context (currently unused but prepared for future auth features)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
