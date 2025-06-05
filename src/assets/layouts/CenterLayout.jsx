/**
 * CenterLayout - Minimal layout for authentication and landing pages
 * Provides centered content without sidebar/header for login, signup, etc.
 * Author: Kim Hammerstad (with layout pattern guidance from Claude 4)
 */

import React from "react";
import { Outlet } from "react-router-dom";

const CenterLayout = () => {
  return (
    <div className="center-wrapper">
      {/* Simple centered main area for auth forms and landing pages */}
      <main>
        <Outlet></Outlet>{" "}
        {/* Route components render here (Login, SignUp, Home, etc.) */}
      </main>
    </div>
  );
};

export default CenterLayout;
