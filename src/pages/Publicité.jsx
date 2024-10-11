import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonExportExcel from "../components/ButtonExportExcel";
import DashboardCalendar from "../components/DashboardCalendar";
import OrderCard from "../components/OrderCard";
import LossesTable from "../components/LossesTable";
import ButtonAdd from "../components/ButtonAdd";
import Modal from "react-modal";
import PublicitéTable from "../components/PublicitéTable";
import PubSwiperAdmin from "../components/PubSwiperAdmin";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function Publicité() {
  const { user } = useAuthContext();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [openModelAddPub, setOpenModelAddPub] = useState(false);

  const handleOpenModalAddPub = () => {

    setOpenModelAddPub(true);
  };

  const handleCloseModalAddPub = () => {
    setOpenModelAddPub(false);
  };

  const [uploadedImage, setUploadedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
    }
  };

  const openFileInput = () => {
    document.getElementById("imageUploadInput").click();
  };

  const clearForm = () => {
    setUploadedImage(null);
  };

  // fetching PublicAdminPublicity data
  const fetchPublicAdminPublicityData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Publicity/fetchAllAdminPublicPublicities`,
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
      else throw new Error("Error receiving PublicAdminPublicity data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: PublicAdminPublicityData,
    error: PublicAdminPublicityError,
    isLoading: PublicAdminPublicityLoading,
    refetch: PublicAdminPublicityRefetch,
  } = useQuery({
    queryKey: ["PublicAdminPublicityData", user?.token, location.key],
    queryFn: fetchPublicAdminPublicityData,
    enabled: !!user?.token, 
    refetchOnWindowFocus: true, 
  });

  // fetching PublicStorePublicity data
  const fetchPublicStorePublicityData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Publicity/fetchAllStorePublicPublicities`,
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
      else throw new Error("Error receiving PublicStorePublicity data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: PublicStorePublicityData,
    error: PublicStorePublicityError,
    isLoading: PublicStorePublicityLoading,
    refetch: PublicStorePublicityRefetch,
  } = useQuery({
    queryKey: ["PublicStorePublicityData", user?.token, location.key],
    queryFn: fetchPublicStorePublicityData,
    enabled: !!user?.token, 
    refetchOnWindowFocus: true,
  });
    
  //save Publicity API
  const handleSavePublicity = async () => {
    try {
      setSubmitionLoading(true);
      const formData = new FormData();
      formData.append("file", uploadedImage);

      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/Publicity/createFromAdmin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        PublicAdminPublicityRefetch();
        setSubmitionLoading(false);
        clearForm();
        handleCloseModalAddPub();
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
        console.error("Error creating Publicity: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating Publicity");
      }
    }
  };


  if (PublicAdminPublicityLoading || PublicStorePublicityLoading) {
    return (
      <div className="pagesContainer h-[100vh]">
        <Header />
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  }
  if (PublicAdminPublicityError || PublicStorePublicityError) {
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
    <div className="pagesContainer pubContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Publicité</h2>
        <ButtonAdd
          buttonSpan="Add a Publicité"
          onClick={handleOpenModalAddPub}
        />
      </div>

      <PubSwiperAdmin 
        data={PublicAdminPublicityData}
        loading={PublicAdminPublicityLoading}
        PublicAdminPublicityRefetch={PublicAdminPublicityRefetch}
        user={user}
      />

      <div className="pageTable ordersTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Publicité..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-2">
            <ButtonExportExcel data={filteredData} filename="Publicité" />
            <Modal
              isOpen={openModelAddPub}
              onRequestClose={handleCloseModalAddPub}
              contentLabel="Add new Publicité"
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
                <h2 className="customerClassTitle">Add New Publicité</h2>

                {/* Image Upload Section */}
                <div className="mt-[20px]">
                  <div
                    className="w-full h-[300px] flex justify-center items-center border-dashed border-[2px] border-gray-400 cursor-pointer"
                    onClick={openFileInput}
                  >
                    {uploadedImage ? (
                      <img
                        src={URL.createObjectURL(uploadedImage)}
                        alt="Uploaded"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <p className="uploadSpan">
                        <span className="text-blue-600">Click to upload </span>
                        or drag and drop SVG, PNG, JPG
                      </p>
                    )}

                    <input
                      id="imageUploadInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end space-x-8 items-start mt-[20px]">
                  <button
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseModalAddPub}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={handleSavePublicity}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal>
            {/* Snackbar */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
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
        </div>
        <div className="pageTableContainer">
          <PublicitéTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
            data={PublicStorePublicityData}
          />
        </div>
      </div>
    </div>
  );
}
