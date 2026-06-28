import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import RegisterDonor from "./pages/donor_regis";
import RequestBlood from "./pages/requestpage";
import DonorList from "./pages/donorlist";
import DonationRecord from "./pages/donation_record"; // Add this import
import Navbar from "./Components/navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register-donor"
          element={
            isAuthenticated ? (
              <RegisterDonor />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/request-blood"
          element={
            isAuthenticated ? (
              <RequestBlood />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/donor-list"
          element={
            isAuthenticated ? (
              <DonorList />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Add DonationRecord Route */}
        <Route
          path="/donation-record"
          element={
            isAuthenticated ? (
              <DonationRecord />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



