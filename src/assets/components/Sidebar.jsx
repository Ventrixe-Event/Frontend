import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaStar,
  FaImage,
  FaFileInvoiceDollar,
  FaCalendar,
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
    to: "/portal/events",
    label: "Events",
    icon: FaCalendar,
    color: "#37437d",
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
        style={{ width: "4rem", height: "4rem" }}
      />
    </NavLink>
  </div>
);

const Sidebar = ({ isOpen, onClose }) => {
  const handleNavClick = () => {
    if (typeof onClose === "function") {
      onClose();
    }
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
    </aside>
  );
};

export default Sidebar;
