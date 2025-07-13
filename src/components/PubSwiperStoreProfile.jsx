import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

export default function PubSwiperStoreProfile({ user }) {
  const { id } = useParams();
  const location = useLocation();
  const fetchStorePublicityData = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_URL_BASE
      }/Publicity/fetchAllStorePublicitiesFromAdmin/${id}`,
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
      if (errorData.error.statusCode == 404) return {};
      else throw new Error("Error receiving StorePublicity data");
    }
    return await response.json();
  };

  const {
    data: StorePublicityData,
    error: StorePublicityDataError,
    isLoading: StorePublicityDataLoading,
    refetch: refetchStorePublicityData,
  } = useQuery({
    queryKey: ["StorePublicityData", user?.token, location.key, id],
    queryFn: fetchStorePublicityData,
    enabled: !!user?.token,
    refetchOnWindowFocus: true,
  });

  const [DeletePub, setDeletePub] = useState(false);
  const [deletedPublicity, setdeletedPublicity] = useState(null);
  const handleOpenDeletePub = (id) => {
    setDeletePub(true);
    setdeletedPublicity(id);
  };

  const [MakePubicityPublic, setMakePubicityPublic] = useState(false);
  const [PublicityID, setPublicityID] = useState(null);
  const handleOpenMakePubicityPublic = (id) => {
    setMakePubicityPublic(true);
    setPublicityID(id);
  };

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDeletePublicity = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.delete(
        import.meta.env.VITE_APP_URL_BASE +
          `/Publicity/deleteFromAdmin/${deletedPublicity}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        refetchStorePublicityData();
        setSubmitionLoading(false);
        setDeletePub(false);
        setdeletedPublicity(null);
      } else {
        setAlertType(true);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
        setdeletedPublicity(null);
      }
    } catch (error) {
      if (error.response) {
        setAlertType(true);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error deleting Publicity: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error deleting Publicity", error);
      }
    }
  };

  const handleDisplayPublic = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_APP_URL_BASE +
          `/Publicity/makePublic/${PublicityID}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        refetchStorePublicityData();
        setSubmitionLoading(false);
        setMakePubicityPublic(false);
        setPublicityID(null);
      } else {
        setAlertType(true);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
        setPublicityID(null);
      }
    } catch (error) {
      if (error.response) {
        setAlertType(true);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error updating Publicity: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error updating Publicity");
      }
    }
  };
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[FreeMode, Pagination]}
        className="pubSwiper"
      >
        {StorePublicityDataLoading || submitionLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        ) : !Array.isArray(StorePublicityData) ||
          StorePublicityData?.lenght <= 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <span>No publicity found</span>
          </div>
        ) : (
          StorePublicityData?.map((pub) => (
            <SwiperSlide key={pub._id} className="swiperSlide">
              <XMarkIcon
                className="h-6 w-6 trashIcon text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleOpenDeletePub(pub._id)}
              />
              <img
                src={`${import.meta.env.VITE_APP_FILES_URL}/${pub.image}`}
                alt={pub.image}
                style={{
                  opacity: `${
                    pub.distination == "public" && pub.displayPublic == false
                      ? "0.5"
                      : "1"
                  }`,
                }}
              />
              {/* button to make the public pub displayed true */}
              {pub.distination == "public" && pub.displayPublic == false && (
                <button
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleOpenMakePubicityPublic(pub._id)}
                >
                  Display Public
                </button>
              )}
              {pub.distination == "public" && pub.displayPublic == true && (
                <div className="hoverPub">
                  <p
                    style={{
                      color: "black",
                    }}
                  >
                    Publicité public
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <ConfirmDialog
        open={DeletePub}
        onClose={() => {
          setDeletePub(false);
          setdeletedPublicity(null);
        }}
        onConfirm={handleDeletePublicity}
        dialogTitle={"Confirm Publicité Deletion"}
        dialogContentText={`Are you sure you want to delete this publicité?`}
        loading={submitionLoading}
      />
      <ConfirmDialog
        open={MakePubicityPublic}
        onClose={() => {
          setMakePubicityPublic(false);
          setPublicityID(null);
        }}
        onConfirm={handleDisplayPublic}
        dialogTitle={"Confirm Publicité Public Displaying"}
        dialogContentText={`Are you sure you want to display this publicité to the public?`}
        loading={submitionLoading}
      />
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
    </>
  );
}
