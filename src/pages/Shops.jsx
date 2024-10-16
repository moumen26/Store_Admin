import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import ShopsTable from "../components/ShopsTable";
import ButtonExportExcel from "../components/ButtonExportExcel";

export default function Shops() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Shops</h2>
        <ButtonAdd buttonSpan="Add New Shop" />
      </div>
      <div className="pageTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Shop..."
            onChange={handleSearchChange}
          />
          <ButtonExportExcel data={filteredData} filename="Shops" />
        </div>
        <div className="pageTableContainer">
          <ShopsTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
