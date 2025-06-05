/**
 * Sidebar component - Main navigation menu for the portal interface
 * Features: Logo, icon-based navigation, active state management, responsive mobile behavior
 * Author: Kim Hammerstad (with component architecture guidance from Claude 4)
 */

import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaStar,
  FaImage,
  FaFileInvoiceDollar,
  FaCalendar,
} from "react-icons/fa";

// Navigation items configuration - centralized data structure for maintainability
// Each item defines route, display name, icon, and custom color
const NAVIGATION_ITEMS = [
  {
    to: "/portal/dashboard",
    label: "Dashboard",
    icon: FaThLarge,
    color: "#f26cf9", // Accent color for primary navigation
  },
  {
    to: "/portal/events",
    label: "Events",
    icon: FaCalendar,
    color: "#37437d", // Standard color for secondary items
  },
  {
    to: "/portal/invoices",
    label: "Invoices",
    icon: FaFileInvoiceDollar,
    color: "#37437d",
  },
  {
    to: "/portal/feedback",
    label: "Feedback",
    icon: FaStar,
    color: "#37437d",
  },
  {
    to: "/portal/gallery",
    label: "Gallery",
    icon: FaImage,
    color: "#37437d",
  },
];

// Navigation Item Component - Reusable nav link with icon and active state styling
const NavigationItem = ({ item, onClick }) => {
  const { to, label, icon: Icon, color } = item;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
      }
      onClick={onClick} // Closes mobile sidebar when nav item is clicked
    >
      <span className="sidebar__nav-icon">
        <Icon style={{ color: color || "inherit", fontSize: "20px" }} />
      </span>
      <span className="sidebar__nav-label">{label}</span>
    </NavLink>
  );
};

// Logo Component - Brand logo with dashboard navigation
const Logo = ({ onClick }) => (
  <div className="sidebar__logo-container">
    <NavLink to="/portal/dashboard" className="sidebar__logo" onClick={onClick}>
      <img
        src="/logos/VentixeLogo.svg"
        alt="Ventixe logo"
        className="sidebar__logo-icon"
        style={{ width: "4rem", height: "4rem" }}
      />
    </NavLink>
  </div>
);

// Main Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  // Handle navigation clicks - closes mobile sidebar for better UX
  const handleNavClick = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <Logo onClick={handleNavClick} />

      {/* Main navigation menu - renders all navigation items dynamically */}
      <nav className="sidebar__nav">
        {NAVIGATION_ITEMS.map((item, index) => (
          <NavigationItem
            key={`nav-item-${index}`}
            item={item}
            onClick={handleNavClick}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
