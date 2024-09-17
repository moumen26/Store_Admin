import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Asidebar from "./components/AsideBar";
import Settings from "./pages/Settings";
import Losses from "./pages/Losses";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Asidebar />
        <Routes>
          <Route path="/Products" element={<Products />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Losses" element={<Losses />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Authentication" element={<Authentication />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
