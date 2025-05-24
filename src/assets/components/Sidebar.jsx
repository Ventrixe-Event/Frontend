import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaCalendarAlt,
  FaDollarSign,
  FaStar,
  FaUsers,
  FaImage,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";

// Navigation items configuration
const NAVIGATION_ITEMS = [
  {
    to: "/portal/dashboard",
    label: "Dashboard",
    icon: FaThLarge,
    color: "#f26cf9",
  },
  {
    to: "/portal/bookings",
    label: "Bookings",
    icon: FaBook,
    color: "#37437d",
  },
  {
    to: "/portal/invoices",
    label: "Invoices",
    icon: FaFileInvoiceDollar,
    color: "#37437d",
  },
  {
    to: "/portal/inbox",
    label: "Inbox",
    icon: FaEnvelope,
    color: "#37437d",
  },
  {
    to: "/portal/calendar",
    label: "Calendar",
    icon: FaCalendarAlt,
    color: "#37437d",
  },
  {
    to: "/portal/events",
    label: "Events",
    icon: FaUsers,
    color: "#37437d",
  },
  {
    to: "/portal/financial",
    label: "Financial",
    icon: FaDollarSign,
    color: "#37437d",
  },
  {
    to: "/portal/gallery",
    label: "Gallery",
    icon: FaImage,
    color: "#37437d",
  },
  {
    to: "/portal/feedback",
    label: "Feedback",
    icon: FaStar,
    color: "#37437d",
  },
];

// Navigation Item Component
const NavigationItem = ({ item, onClick }) => {
  const { to, label, icon: Icon, color } = item;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
      }
      onClick={onClick}
    >
      <span className="sidebar__nav-icon">
        <Icon style={{ color: color || "inherit", fontSize: "20px" }} />
      </span>
      <span className="sidebar__nav-label">{label}</span>
    </NavLink>
  );
};

// Logo Component
const Logo = ({ onClick }) => (
  <div className="sidebar__logo-container">
    <NavLink to="/portal/dashboard" className="sidebar__logo" onClick={onClick}>
      <img
        src="/logos/VentixeLogo.svg"
        alt="Ventixe logo"
        className="sidebar__logo-icon"
        style={{ width: "2.5rem", height: "2.5rem" }}
      />
    </NavLink>
  </div>
);

// Promo Banner Component
const PromoBanner = () => (
  <div className="sidebar__promo">
    <div className="sidebar__promo-card">
      <img
        src="/icons/PhoneIcon.svg"
        alt="New Features"
        className="sidebar__promo-image"
      />
      <p className="sidebar__promo-title">
        Experience enhanced features and a smoother interface with the latest
        update
      </p>
      <button className="sidebar__promo-button">Try New Version</button>
    </div>
  </div>
);

// Sign Out Button Component
const SignOutButton = ({ onClick }) => (
  <button className="sidebar__signout-button" onClick={onClick}>
    <div className="sidebar__signout-content">
      <span className="sidebar__signout-text">Sign Out</span>
      <span className="sidebar__signout-icon">
        <FaSignOutAlt style={{ fontSize: "16px" }} />
      </span>
    </div>
  </button>
);

const Sidebar = ({ isOpen, onClose }) => {
  const handleNavClick = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleSignOut = () => {
    // Add sign out logic here
    console.log("Signing out...");
    handleNavClick();
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <Logo onClick={handleNavClick} />

      <nav className="sidebar__nav">
        {NAVIGATION_ITEMS.map((item, index) => (
          <NavigationItem
            key={`nav-item-${index}`}
            item={item}
            onClick={handleNavClick}
          />
        ))}
      </nav>

      <PromoBanner />

      <div className="sidebar__footer">
        <SignOutButton onClick={handleSignOut} />
      </div>
    </aside>
  );
};

export default Sidebar;
