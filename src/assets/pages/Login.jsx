import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-form">
      <h1>Login to Ventixe</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-actions">
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="auth-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
