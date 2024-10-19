import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import VerifiedShopsTable from "../components/VerifiedShopsTable";
import ButtonExportExcel from "../components/ButtonExportExcel";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { TokenDecoder } from "../util/DecodeToken";
import { useLocation } from "react-router-dom";

export default function VerifiedShops() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //---------------------------------API calls---------------------------------\\

  //fetch data
  const fetchClientData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Client/admin/verified/${
        decodedToken.id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode === 404) {
        return []; // Return an empty array if no data is found
      } else {
        throw new Error("Error receiving Client data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: ClientData,
    error: ClientDataError,
    isLoading: ClientDataLoading,
    refetch: refetchClientData,
  } = useQuery({
    queryKey: ["ClientData", user?.token, location.key],
    queryFn: fetchClientData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetch on window focus
  });

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Verified Shops</h2>
        {/* <ButtonAdd buttonSpan="Add New Shop" /> */}
      </div>
      <div className="pageTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Shop..."
            onChange={handleSearchChange}
          />
          <ButtonExportExcel data={filteredData} filename="Verified Shops" />
        </div>
        <div className="pageTableContainer">
          <VerifiedShopsTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
            data={ClientData}
            loading={ClientDataLoading}
            refetchClientData={refetchClientData}
          />
        </div>
      </div>
    </div>
  );
}
