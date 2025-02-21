import React, { useState } from "react";
import Header from "../components/Header";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonAdd from "../components/ButtonAdd";
import CustomerStatsCard from "../components/CustomerStatsCard";
import CustomerProfileAbonnementTable from "../components/CustomerProfileAbonnementTable";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import ButtonEye from "../components/ButtonEye";
import Modal from "react-modal";
import PubSwiperStoreProfile from "../components/PubSwiperStoreProfile";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function CustomerProfile() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Redirect = (path) => {
    navigate(`/${path}`);
  };

  const [openModelVoirPub, setOpenModelVoirPub] = useState(false);

  const handleOpenModalVoirPub = () => {
    setOpenModelVoirPub(true);
  };

  const handleCloseModalVoirPub = () => {
    setOpenModelVoirPub(false);
  };

  //---------------------------------API calls---------------------------------\\

  // Define a function that fetches the store data
  const fetchStoreData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Store/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      // Handle the error state
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return {};
      else throw new Error("Error receiving store data");
    }
    // Return the data
    return await response.json();
  };

  //Use the useQuery hook to fetch the Store data
  const {
    data: StoreData,
    error: StoreDataError,
    isLoading: StoreDataLoading,
    refetch: refetchStoreData,
  } = useQuery({
    queryKey: ["StoreData", user?.token, location.key, id],
    queryFn: fetchStoreData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetching on window focus
  });

  // Define a function that fetches the subscriptions data
  const fetchSubscriptionsData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/SubscriptionStore/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      // Handle the error state
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return {};
      else throw new Error("Error receiving subscriptions data");
    }
    // Return the data
    return await response.json();
  };

  //Use the useQuery hook to fetch the Store data
  const {
    data: SubscriptionsData,
    error: SubscriptionsDataError,
    isLoading: SubscriptionsDataLoading,
    refetch: refetchSubscriptionsData,
  } = useQuery({
    queryKey: ["SubscriptionsData", user?.token, location.key, id],
    queryFn: fetchSubscriptionsData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetching on window focus
  });

  if (StoreDataLoading || SubscriptionsDataLoading) {
    return (
      <div className="pagesContainer h-[100vh]">
        <Header />
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress color="inherit" />
          {/* <h1>Loading...</h1> */}
        </div>
      </div>
    );
  }
  if (StoreDataError) {
    return (
      <div className="pagesContainer">
        <Header />
        <div className="customerClass">
          <h2 className="customerClassTitle">no data is available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span>Stores</span>
          <ChevronRightIcon className="iconAsideBar" />
          <span>
            {StoreData?.firstName} {StoreData?.lastName}
          </span>
        </div>
        <ButtonEye
          onClick={handleOpenModalVoirPub}
          buttonSpan="Voir Publicités"
        />
        <Modal
          isOpen={openModelVoirPub}
          onRequestClose={handleCloseModalVoirPub}
          contentLabel="Voir Publicités"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              margin: "auto",
              maxWidth: "70%",
              height: "fit-content",
              zIndex: 1001,
            },
          }}
        >
          <div className="customerClass pb-0">
            <h2 className="customerClassTitle">Voir Publicité</h2>
            <div className="flex-col space-y-4">
              <PubSwiperStoreProfile 
                user={user}
              />
            </div>

            <div className="flex justify-end space-x-8 items-start mt-[20px]">
              <button
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleCloseModalVoirPub}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="customerClass">
        <h2 className="customerClassTitle">Personal Information</h2>
        <div className="personalInformation">
          {StoreData?.firstName && (
            <div className="flex-col">
              <span className="personalInformationSpan">First Name</span>
              <h3 className="personalInformationDetails">
                {StoreData.firstName}
              </h3>
            </div>
          )}

          {StoreData?.lastName && (
            <div className="flex-col">
              <span className="personalInformationSpan">Last Name</span>
              <h3 className="personalInformationDetails">
                {StoreData.lastName}
              </h3>
            </div>
          )}

          {StoreData?.phoneNumber && (
            <div className="flex-col">
              <span className="personalInformationSpan">Number Phone</span>
              <h3 className="personalInformationDetails">
                {StoreData.phoneNumber}
              </h3>
            </div>
          )}

          {StoreData?.email && (
            <div className="flex-col">
              <span className="personalInformationSpan">Email Address</span>
              <h3 className="personalInformationDetails">{StoreData.email}</h3>
            </div>
          )}

          {StoreData?.wilaya && (
            <div className="flex-col">
              <span className="personalInformationSpan">Wilaya</span>
              <h3 className="personalInformationDetails">{StoreData.wilaya}</h3>
            </div>
          )}

          {StoreData?.commune && (
            <div className="flex-col">
              <span className="personalInformationSpan">Commune</span>
              <h3 className="personalInformationDetails">
                {StoreData.commune}
              </h3>
            </div>
          )}

          {StoreData?.storeAddress && (
            <div
              className="flex-col"
              style={{ cursor: "pointer" }}
              onClick={() => Redirect(StoreData.storeLocation)}
            >
              <span className="personalInformationSpan">Address</span>
              <h3 className="personalInformationDetails">
                {StoreData.storeAddress}
              </h3>
            </div>
          )}

          {StoreData?.storeName && (
            <div className="flex-col">
              <span className="personalInformationSpan">Store name</span>
              <h3 className="personalInformationDetails">
                {StoreData.storeName}
              </h3>
            </div>
          )}

          {StoreData?.status && (
            <div className="flex-col">
              <span className="personalInformationSpan">Status</span>
              <h3 className="personalInformationDetails">{StoreData.status}</h3>
            </div>
          )}

          {StoreData?.r_commerce && (
            <div className="flex-col">
              <span className="personalInformationSpan">
                Commercial register number
              </span>
              <h3 className="personalInformationDetails">
                {StoreData.r_commerce}
              </h3>
            </div>
          )}
        </div>
      </div>

      <div className="customerClass">
        <h2 className="customerClassTitle">Stats</h2>
        <div className="flex space-x-4">
          <CustomerStatsCard
            customerStatsCardTitle="Total Abonnements"
            customerStatsCardDetails={StoreData?.subscriptions.length}
          />
          <CustomerStatsCard
            customerStatsCardTitle="Total Amount"
            customerStatsCardDetails={SubscriptionsData?.reduce(
              (total, subscription) => {
                return total + subscription.amount;
              },
              0
            )}
          />
        </div>
      </div>
      <div className="customerClass customerOrdersClass">
        <h2 className="customerClassTitle">Abonnements</h2>
        <CustomerProfileAbonnementTable
          searchQuery={searchQuery}
          setFilteredData={setFilteredData}
          data={SubscriptionsData}
          loading={SubscriptionsDataLoading}
          handleRefetchDataChange={refetchSubscriptionsData}
        />
      </div>
    </div>
  );
}
