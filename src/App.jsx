import React from "react";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Asidebar from "./components/AsideBar";
import Settings from "./pages/Settings";
import Losses from "./pages/Losses";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";
import VerifyCode from "./pages/VerifyCode";
import SignIn from "./pages/SignIn";

function App() {

  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <main>
        {user ? <Asidebar /> : <SignIn />}

        <Routes>
          {/* private routes */}
          <Route path="/" element={user ? <Dashboard /> : <SignIn />} />
          <Route path="/Products" element={user ? <Products /> : <SignIn />} />
          <Route path="/Settings" element={user ? <Settings /> : <SignIn />} />
          <Route path="/Losses" element={user ? <Losses /> : <SignIn />} />
          <Route path="/Customers" element={user ? <Customers /> : <SignIn />} />
          <Route path="/Authentication" element={user ? <Authentication /> : <SignIn />} />

          {/* public routes */}
          <Route
            path="/SignIn"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/VerifyCode/:id"
            element={!user ? <VerifyCode /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
