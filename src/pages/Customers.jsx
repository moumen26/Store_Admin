import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import CustomersTable from "../components/CustomersTable";
import ButtonExportExcel from "../components/ButtonExportExcel";
import Modal from "react-modal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Customers() {
  const { user } = useAuthContext();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [isFormValid, setIsFormValid] = useState(true);

  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

  const handleOpenAddCustomerModal = (e) => {
    setOpenAddCustomerModal(true);
  };

  const handleCloseAddCustomerModal = (e) => {
    setOpenAddCustomerModal(false);
  };

  
  // fetching active Stores data
  const fetchStoresData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Store/all/active`,
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


  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Customers</h2>
        <ButtonAdd
          buttonSpan="Add New Customer"
          onClick={handleOpenAddCustomerModal}
        />
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
            data={StoresData}
            isLoading={StoresLoading}
          />
        </div>
      </div>
      <Modal
        isOpen={openAddCustomerModal}
        onRequestClose={handleCloseAddCustomerModal}
        contentLabel="Add New Costumer"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            border: "none",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "fit-content",
            margin: "auto",
            height: "fit-content",
            zIndex: 1001,
            overflowY: "auto",
          },
        }}
      >
        {/* {!submitionLoading ? ( */}
        <div className="customerClass pb-0">
          <h2 className="dialogTitle">Add New Customer</h2>
          <div className="flex-col items-center w-full space-y-8 mt-[16px] p-0">
            <div className="dialogAddCustomerItem items-center">
              <span>First Name</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="customerFirstName"
                  // value={FirstName}
                  // onChange={handleFirstNameChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
              <span>Last Name</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="customerLastName"
                  // value={LastName}
                  // onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
              <span>Address</span>
              <div className="inputForm">
                <input
                  type="text"
                  name="storeAddress"
                  // value={Address}
                  // onChange={handleAddressChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
              <span>Number Phone</span>
              <div className="inputForm">
                <input
                  type="phone"
                  name="customerPhone"
                  // value={Phone}
                  // onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
              <span>Commercial register number</span>
              <div className="inputForm">
                <input
                  type="number"
                  name="R_Commerce"
                  // value={R_Commerce}
                  // setChangevalue={handleR_CommerceChange}
                />
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
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
            <div className="dialogAddCustomerItem items-center">
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
            <div className="dialogAddCustomerItem space-x-10 items-center">
              <div className="flex items-center space-x-4">
                <span>Wilaya</span>
                <div className="selectStoreWilayaCommune">
                  <select
                    name="fournisseurWilaya"
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
              <div className="flex items-center space-x-4">
                <span>Commune</span>
                <div className="selectStoreWilayaCommune">
                  <select
                    name="fournisseurCommune"
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
            <div className="dialogAddCustomerItem items-center">
              <span>Abonnement</span>
              <div className="selectStoreWilayaCommune w-[500px]">
                <select
                  name=""
                  // value={}
                  // onChange={}
                >
                  <option value="">Select Abonnement</option>
                </select>
              </div>
            </div>
            <div className="dialogAddCustomerItem items-center">
              <span>Durée</span>
              <div className="selectStoreWilayaCommune w-[500px]">
                <select
                  name=""
                  // value={}
                  // onChange={}
                >
                  <option value="">Select Durée</option>
                  <option value="">1 mois</option>
                  <option value="">2 mois</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-8">
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleCloseAddCustomerModal}
            >
              Cancel
            </button>
            <button
              className={`text-blue-500 cursor-pointer hover:text-blue-700 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              // onClick={handleSaveCustomer}
              disabled={!isFormValid}
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
