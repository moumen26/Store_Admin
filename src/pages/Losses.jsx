import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonExportExel from "../components/ButtonExportExcel";
import DashboardCalendar from "../components/DashboardCalendar";
import OrderCard from "../components/OrderCard";
import LossesTable from "../components/LossesTable";
import ButtonAdd from "../components/ButtonAdd";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { TokenDecoder } from "../util/DecodeToken";
import { useLocation } from "react-router-dom";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function Losses() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const location = useLocation();

  const [price, setPrice] = useState("");
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const [reason, setReason] = useState("");
  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // Update dashboard content based on the selected date range
      updateDashboardContent(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange]);

  const updateDashboardContent = (startDate, endDate) => {
    // Logic to update dashboard content based on selected date range
    console.log("Selected range:", startDate, endDate);
    // Fetch or filter data based on date range and update dashboard content
  };

  const [openModelAddLoss, setOpenModelAddLoss] = useState(false);

  const handleOpenModalAddLoss = () => {
    setOpenModelAddLoss(true);
  };

  const handleCloseModalAddLoss = () => {
    setOpenModelAddLoss(false);
  };

  //---------------------------------API calls---------------------------------\\

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //fetch data
  const fetchLossesData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Losses/admin/${decodedToken.id}`,
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
        throw new Error("Error receiving losses data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: LossesData,
    error: LossesDataError,
    isLoading: LossesDataLoading,
    refetch: refetchLossesData,
  } = useQuery({
    queryKey: ["LossesData", user?.token, location.key],
    queryFn: fetchLossesData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetch on window focus
  });

  //fetch statistics
  const fetchLossesstatistics = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Losses/admin/statistics/${
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
        throw new Error("Error receiving losses statistics");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: Lossesstatistics,
    error: LossesstatisticsError,
    isLoading: LossesstatisticsLoading,
    refetch: refetchLossesstatistics,
  } = useQuery({
    queryKey: ["Lossesstatistics", user?.token, location.key],
    queryFn: fetchLossesstatistics,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetch on window focus
  });

  const refetchData = () => {
    refetchLossesData();
    refetchLossesstatistics();
  };

  const handleSubmitCreateLoss = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE +
          `/Losses/admin/create/${decodedToken.id}`,
        {
          price: price,
          reason: reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        refetchData();
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
        handleCloseModalAddLoss();
      } else {
        setAlertType(true);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setAlertType(true);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error creating new loss: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating new loss");
      }
    }
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Losses</h2>
        <DashboardCalendar
          onDateChange={(start, end) =>
            setDateRange({ startDate: start, endDate: end })
          }
        />
      </div>
      <div className="flex items-center space-x-6">
        <OrderCard
          orderCardTitle="Total Losses"
          orderCardDetails={
            Lossesstatistics?.count ? Lossesstatistics?.count : 0
          }
          loading={LossesstatisticsLoading}
        />
        <OrderCard
          orderCardTitle="Total price"
          orderCardDetails={`${
            Lossesstatistics?.total ? Lossesstatistics?.total : (0).toFixed(2)
          } DA`}
          loading={LossesstatisticsLoading}
        />
      </div>
      <div className="pageTable ordersTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Loss..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-2">
            <ButtonExportExel data={filteredData} filename="Losses" />
            <ButtonAdd
              buttonSpan="Add a Loss"
              setOnClick={handleOpenModalAddLoss}
            />
            <Modal
              isOpen={openModelAddLoss}
              onRequestClose={handleCloseModalAddLoss}
              contentLabel="Add Address Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                },
                content: {
                  border: "none",
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "40%",
                  margin: "auto",
                  height: "fit-content",
                  zIndex: 1001,
                },
              }}
            >
              <div className="customerClasss">
                <h2 className="customerClassTitle">Add New Loss</h2>
                <div className="flex-col space-y-4">
                  <div className="flex justify-end items-center space-x-4">
                    <span>Amount :</span>
                    <div className="inputForm pl-0">
                      <input
                        type="number"
                        min={0}
                        name="lossAmount"
                        onChange={handleChangePrice}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-4">
                    <span>Cause :</span>
                    <div className="inputForm pl-0">
                      <input
                        type="text"
                        name="lossCause"
                        onChange={handleChangeReason}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-8 items-start mt-[20px]">
                  {!submitionLoading ? (
                    <>
                      <button
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={handleCloseModalAddLoss}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={handleSubmitCreateLoss}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <div className="flex justify-end space-x-8 pr-8 items-start h-[60px] mt-2">
                      <CircularProgress color="inherit" />
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="pageTableContainer">
          <LossesTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
            data={LossesData}
            loading={LossesDataLoading}
            refetchLossesData={refetchData}
          />
        </div>
      </div>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
