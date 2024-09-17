import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import CustomersTable from "../components/CustomersTable";
import ButtonExportExcel from "../components/ButtonExportExcel";

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Customers</h2>
        <ButtonAdd buttonSpan="Add New Customer" />
      </div>
      <div className="pageTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Customer..."
            onChange={handleSearchChange}
          />
          <ButtonExportExcel data={filteredData} filename="Customers" />
        </div>
        <div className="pageTableContainer">
          <CustomersTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
