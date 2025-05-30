import React from "react";
import { FiBell, FiSettings, FiMenu, FiSearch } from "react-icons/fi";
import VentixeLogo from "../../../public/logos/VentixeLogo.svg";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={VentixeLogo} alt="Ventixe logo" />
      </a>

      <div className="header__title">
        <h2>Dashboard</h2>
        <p>Hello Kim, welcome back!</p>
      </div>

      <div className="header__actions">
        <div className="header__search">
          <input type="text" placeholder="Search anything..." />
          <FiSearch className="header__search-icon" />
        </div>

        <div className="header__actions-left">
          <div className="header__icon-button">
            <span className="header__notification-badge"></span>
            <FiBell />
          </div>

          <div className="header__icon-button">
            <FiSettings />
          </div>
        </div>

        <div className="header__profile">
          <div className="header__profile-pic"></div>
          <div className="header__profile-info">
            <span className="header__profile-name">Kim Hammerstad</span>
            <span className="header__profile-role">Admin</span>
          </div>
        </div>
      </div>

      <button className="header__hamburger" onClick={onToggleSidebar}>
        <FiMenu />
      </button>
    </header>
  );
};

export default Header;
