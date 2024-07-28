import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";

import Login from "./screens/Login.jsx";
import SignUp from "./screens/SignUp.jsx";
import RecoveryAccount from "./screens/RecoveryAccount.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import { checkAuth } from "./config.js";
import Home from "./screens/Home";

const auth = checkAuth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={auth ? <Dashboard /> : <SignUp />} />
        <Route
          path="/recovery-account"
          element={auth ? <Dashboard /> : <RecoveryAccount />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={auth ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
