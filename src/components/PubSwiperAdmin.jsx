import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";


export default function PubSwiperAdmin({data, loading, PublicAdminPublicityRefetch, user}) {
  const [DeletePub, setDeletePub] = useState(false);
  const [deletedPublicity, setdeletedPublicity] = useState(null);
  const handleOpenDeletePub = (id) => {
    setDeletePub(true);
    setdeletedPublicity(id);
  };
  
  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDeletePublicity = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.delete(
        import.meta.env.VITE_APP_URL_BASE + `/Publicity/deleteFromAdmin/${deletedPublicity}`,
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
        PublicAdminPublicityRefetch();
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

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[FreeMode, Pagination]}
        className="pubSwiper"
      >
        {loading || submitionLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        ) : !Array.isArray(data) || data?.lenght <= 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <span>No publicity found</span>
          </div>
        ) : (
          data?.map((pub) => (
            <SwiperSlide key={pub._id} className="swiperSlide">
              <XMarkIcon
                className="h-6 w-6 trashIcon text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleOpenDeletePub(pub._id)}
              />
              <img 
                src={`${import.meta.env.VITE_APP_URL_BASE.replace(
                  "/api",
                  ""
                )}/files/${pub.image}`} 
                alt={pub.image}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <ConfirmDialog
        open={DeletePub}
        onClose={()=> {
          setDeletePub(false)
          setdeletedPublicity(null)
        }}
        onConfirm={handleDeletePublicity}
        dialogTitle={"Confirm Publicité Deletion"}
        dialogContentText={`Are you sure you want to delete this publicité?`}
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
