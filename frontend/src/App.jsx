import { useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/auth/Protected";
import Login from "./pages/auth/Login";
import Grades from "./pages/Grades/Grades";
import Home from "./pages/Home";
import Evaluations from "./components/Grades/Evaluations";
import Assignment from "./pages/Grades/Assignment";


function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
  }

  return (

      <BrowserRouter>
        <Routes>
          <Route
            path="/professors/grades"
            element={
              <Protected>
                <Grades />
              </Protected>
            }
          />
          <Route
            path="/evaluations"
            element={
              <Protected>
                <Evaluations />
              </Protected>
            }
          />
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/admin/assign"
            element={
              <Protected>
                <Assignment />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;