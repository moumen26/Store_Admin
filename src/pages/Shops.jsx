import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import ShopsTable from "../components/ShopsTable";
import ButtonExportExcel from "../components/ButtonExportExcel";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { TokenDecoder } from "../util/DecodeToken";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

import { CircularProgress } from "@mui/material";

export default function Shops() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddShopClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //---------------------------------API calls---------------------------------\\

  //fetch data
  const fetchClientData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Client/admin/unverified/${
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
        <h2 className="pagesTitle">Shops</h2>
        <ButtonAdd buttonSpan="Add New Shop" setOnClick={handleAddShopClick} />
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
            data={ClientData}
            loading={ClientDataLoading}
            refetchClientData={refetchClientData}
          />
        </div>
      </div>

      <Modal
        isOpen={openDialog}
        onRequestClose={handleCloseDialog}
        contentLabel="Add New Shop"
        className="addNewModal addNewCustomerModal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        {/* {!submitionLoading ? ( */}
        <div className="customerClass pb-0">
          <h2 className="dialogTitle">Add New Shop</h2>
          <div className="flex-col items-center w-full space-y-8 mt-[16px] p-0">
            <div className="dialogAddCustomerItem">
              <span>First Name</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="shopFirstName"
                  // value={FirstName}
                  // onChange={handleFirstNameChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Last Name</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="shopLastName"
                  // value={LastName}
                  // onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Address</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="shopAddress"
                  // value={Address}
                  // onChange={handleAddressChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Number Phone</span>
              <div className="inputForm">
                <input
                  type="phone"
                  name="shopPhone"
                  // value={Phone}
                  // onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Email</span>
              <div className="inputForm">
                <input
                  type="email"
                  name="shopAddress"
                  // value={Email}
                  // onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Numero de registre de commerce</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="rc"
                  // value={RC}
                  // onChange={handleRCChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Password</span>
              <div className="inputForm">
                <input
                  type="password"
                  name="password"
                  // value={Password}
                  // onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem">
              <span>Confirm password</span>
              <div className="inputForm">
                <input
                  type="password"
                  name="ConfirmPassword"
                  // value={ConfirmPassword}
                  // onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem wilayaCommune">
              <div className="WilayaCommuneClass">
                <span>Wilaya</span>
                <div className="selectStoreWilayaCommune">
                  <select
                    name="shopWilaya"
                    // value={selectedWilaya}
                    // onChange={handleWilayaChange}
                  >
                    <option value="">Select Wilaya</option>
                    {/* {wilayas.map((wilaya) => (
                        <option key={wilaya.value} value={wilaya.value}>
                          {wilaya.label}
                        </option>
                      ))} */}
                  </select>
                </div>
              </div>
              <div className="WilayaCommuneClass">
                <span>Commune</span>
                <div className="selectStoreWilayaCommune">
                  <select
                    name="shopCommune"
                    // value={selectedCommune}
                    // onChange={handleCommuneChange}
                  >
                    <option value="">Select Commune</option>
                    {/* {communes.map((commune) => (
                        <option key={commune.value} value={commune.value}>
                          {commune.label}
                        </option>
                      ))} */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-8 mt-[20px]">
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
            <button
            // className={`text-blue-500 cursor-pointer hover:text-blue-700 ${
            //   !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            // }`}
            // onClick={handleSaveCustomer}
            // disabled={!isFormValid}
            >
              Save
            </button>
          </div>
        </div>
        {/* ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )} */}
      </Modal>
    </div>
  );
}
