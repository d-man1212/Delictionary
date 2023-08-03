import React from "react";
import ReactDOM from "react-dom";
import "./src/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./src/pages/Landing";
import Registration from "./src/pages/Registration";
import Login from "./src/pages/Login";
import ForgotPassword from "./src/pages/ForgotPassword";
import Dashboard from "./src/pages/Dashboard";
import Profile from "./src/pages/Profile";
import { AuthProvider } from "./src/Contexts/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/recipes" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
