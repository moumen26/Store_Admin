import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import AuthenticationTable from "../components/AuthenticationTable";
import ButtonExportExcel from "../components/ButtonExportExcel";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Authentication() {
  const { user } = useAuthContext();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // fetching pending Stores data
  const fetchStoresData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Store/all/pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    // Handle the error state
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return [];
      else throw new Error("Error receiving Stores data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: StoresData,
    error: StoresError,
    isLoading: StoresLoading,
    refetch: StoresRefetch,
  } = useQuery({
    queryKey: ["StoresData", user?.token, location.key],
    queryFn: fetchStoresData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  useEffect(() => {
    StoresRefetch();
  },[location.key]);

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
            data={StoresData}
            isLoading={StoresLoading}
            handleRefetchDataChange={StoresRefetch}
          />
        </div>
      </div>
    </div>
  );
}
