/**
 * Main App component - Defines the routing structure for the Ventixe event management platform
 * Uses React Router v6 for client-side navigation with nested layouts
 * Author: Kim Hammerstad (with routing architecture guidance from Claude 4)
 */

import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CenterLayout from "./assets/layouts/CenterLayout";
import PortalLayout from "./assets/layouts/PortalLayout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoices from "./pages/Invoices/Invoices";
import Events from "./pages/Events/Events";
import Feedback from "./pages/Feedback/Feedback";
import Gallery from "./pages/Gallery/Gallery";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import ForgotPassword from "./assets/pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* Root redirect: Automatically redirects visitors to the main dashboard */}
      <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />

      {/* CenterLayout: Used for authentication and landing pages (minimal UI, centered content) */}
      <Route element={<CenterLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* PortalLayout: Main application interface with sidebar navigation, header, and footer */}
      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<Dashboard />} />{" "}
        {/* Default route for /portal */}
        <Route path="dashboard" element={<Dashboard />} />{" "}
        {/* Main analytics dashboard */}
        <Route path="invoices" element={<Invoices />} />{" "}
        {/* Financial management */}
        <Route path="events" element={<Events />} />{" "}
        {/* Event management system */}
        <Route path="feedback" element={<Feedback />} />{" "}
        {/* Customer feedback collection */}
        <Route path="gallery" element={<Gallery />} />{" "}
        {/* Media and photo management */}
      </Route>
    </Routes>
  );
}

export default App;
