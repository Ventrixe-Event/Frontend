import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Ventixe</h1>
      <p>Your all-in-one event management platform</p>

      <div className="home-actions">
        <Link to="/login" className="btn-primary">
          Login
        </Link>
        <Link to="/signup" className="btn-outline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
