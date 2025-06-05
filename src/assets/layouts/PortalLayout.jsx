/**
 * PortalLayout - Main application layout for authenticated portal pages
 * Provides consistent header, sidebar, footer structure with responsive sidebar toggle
 * Author: Kim Hammerstad (with layout pattern guidance from Claude 4)
 */

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PortalLayout = () => {
  // Sidebar visibility state - starts open on desktop, can be toggled for mobile
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle function passed to header hamburger menu
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="portal-wrapper">
      {/* Sidebar: Navigation menu with responsive open/close behavior */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header: Top bar with logo, title, profile, and mobile toggle */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Main content area: Where page components render via React Router outlet */}
      <main>
        <Outlet /> {/* React Router renders matched route components here */}
      </main>

      {/* Footer: Consistent bottom section across all portal pages */}
      <Footer />
    </div>
  );
};

export default PortalLayout;
