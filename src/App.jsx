import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CenterLayout from "./assets/layouts/CenterLayout";
import PortalLayout from "./assets/layouts/PortalLayout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoices from "./pages/Invoices/Invoices";
import Events from "./pages/Events/Events";
import Feedback from "./pages/Feedback/Feedback";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import ForgotPassword from "./assets/pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* Creates a redirect to the dashboard page */}
      <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />

      <Route element={<CenterLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="events" element={<Events />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
    </Routes>
  );
}

export default App;
