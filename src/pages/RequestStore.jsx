import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";

import ButtonExportExcel from "../components/ButtonExportExcel";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import RequestStoreTable from "../components/RequestStoreTable";
import { useQuery } from "@tanstack/react-query";
import { TokenDecoder } from "../util/DecodeToken";

export default function RequestStore() {
  const { user } = useAuthContext();
  const location = useLocation();
  const decodedToken = TokenDecoder();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // fetching active Requests data
  const fetchRequestsData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/SubscriptionStore/requests/${decodedToken?.id}`,
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
    data: RequestsData,
    error: RequestsDataError,
    isLoading: RequestsDataLoading,
    refetch: RequestsDataRefetch,
  } = useQuery({
    queryKey: ["RequestsData", user?.token, location.key],
    queryFn: fetchRequestsData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Subscription requests</h2>
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
          <RequestStoreTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
            data={RequestsData}
            isLoading={RequestsDataLoading}
            handleRefetchDataChange={RequestsDataRefetch}
          />
        </div>
      </div>
    </div>
  );
}
