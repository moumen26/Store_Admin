import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import AuthenticationTable from "../components/AuthenticationTable";
import ButtonExportExcel from "../components/ButtonExportExcel";

export default function Authentication() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">User Authentication</h2>
        {/* <ButtonAdd buttonSpan="New Customer" /> */}
      </div>
      <div className="pageTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by User..."
            onChange={handleSearchChange}
          />
          <ButtonExportExcel
            data={filteredData}
            filename="User Authentication"
          />
        </div>
        <div className="pageTableContainer">
          <AuthenticationTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
