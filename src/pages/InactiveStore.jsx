import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";

import ButtonExportExcel from "../components/ButtonExportExcel";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import InactiveStores from "../components/InactiveStoresTable";

export default function InactiveStore() {
  const { user } = useAuthContext();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Inactive Store</h2>
      </div>
      <div className="pageTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Store..."
            onChange={handleSearchChange}
          />
          <ButtonExportExcel data={filteredData} filename="Inactive Store" />
        </div>
        <div className="pageTableContainer">
          <InactiveStores
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
