/**
 * Header component - Top navigation bar for the main portal interface
 * Features: Logo, dynamic title, user profile, and mobile hamburger menu
 * Author: Kim Hammerstad (with responsive design guidance from Claude 4)
 */

import React from "react";
import { FiMenu } from "react-icons/fi";
import VentixeLogo from "../../../public/logos/VentixeLogo.svg";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      {/* Company logo with home link */}
      <a href="/" className="header__logo">
        <img src={VentixeLogo} alt="Ventixe logo" />
      </a>

      {/* Dynamic title section - shows current page context and personalized greeting */}
      <div className="header__title">
        <h2>Dashboard</h2>{" "}
        {/* TODO: Make this dynamic based on current route */}
        <p>Hello Kim, welcome back!</p>{" "}
        {/* TODO: Pull user name from auth context */}
      </div>

      {/* User actions and profile information */}
      <div className="header__actions">
        <div className="header__profile">
          <div className="header__profile-pic"></div>{" "}
          {/* Placeholder for user avatar */}
          <div className="header__profile-info">
            <span className="header__profile-name">Kim Hammerstad</span>{" "}
            {/* TODO: Dynamic user data */}
            <span className="header__profile-role">Admin</span>{" "}
            {/* TODO: Dynamic role from auth */}
          </div>
        </div>
      </div>

      {/* Mobile hamburger menu button - toggles sidebar visibility on smaller screens */}
      <button className="header__hamburger" onClick={onToggleSidebar}>
        <FiMenu />
      </button>
    </header>
  );
};

export default Header;
