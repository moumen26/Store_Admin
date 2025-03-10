import {
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import {
  BellAlertIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { NavLink, useLocation } from "react-router-dom";
import { TokenDecoder } from "../util/DecodeToken";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../util/useFullFunctions";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

export default function Header() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { logout } = useLogout();

  const submitLogout = () => {
    logout();
  };

  //fetch data
  const fetchNotificationsByAdmin = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Notification/admin/nonRead/${
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
        throw new Error("Error receiving notifications data for this Admin");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: NotificationsByAdmin,
    error: NotificationsByAdminError,
    isLoading: NotificationsByAdminLoading,
    refetch: refetchNotificationsByAdmin,
  } = useQuery({
    queryKey: ["NotificationsByAdmin", user?.token, location.key],
    queryFn: fetchNotificationsByAdmin,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // enable refetch on window focus (optional)
    staleTime: 1000 * 60, // Data is fresh for 1 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmitMarkNotificationAsRead = async (val) => {
    if (submitionLoading) return;
    try {
      setSubmitionLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_APP_URL_BASE + `/Notification/asRead/${val}`,
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
        setSubmitionLoading(false);
        refetchNotificationsByAdmin();
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
        console.error("Error mark as read notification: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error mark as read notification");
      }
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const dateObj = new Date(date);
    if (dateObj.toDateString() === today.toDateString()) {
      return "Today";
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return dateObj.toLocaleDateString(undefined, options);
    }
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  // Group notifications by formatted date
  const groupedNotifications = NotificationsByAdmin?.reduce((acc, notif) => {
    const formattedDate = formatDate(notif.createdAt);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(notif);
    return acc;
  }, {});

  return (
    <div className="Header relative flex items-center space-x-6">
      {/* Notification Icon */}
      <div
        className="relative cursor-pointer p-2 bg-gray-100 rounded-full"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellAlertIcon className="w-6 h-6 text-gray-600" />
        {NotificationsByAdmin?.length > 0 && (
          <span className="absolute top-[-4px] right-[-3px] bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {NotificationsByAdmin.length}
          </span>
        )}
      </div>

      {/* Notifications Dropdown */}
      <div
        className={`absolute right-[455px] top-0 w-[450px] bg-white shadow-lg rounded-xl border border-gray-200 z-20 transform
        ${
          showNotifications
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        } transition-transform duration-200 ease-out`}
      >
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
          <XMarkIcon
            className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowNotifications(false)}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-2 p-4 pt-0">
          {!NotificationsByAdminLoading ? (
            Object.entries(groupedNotifications || {}).map(
              ([dateLabel, notifications]) => (
                <div key={dateLabel}>
                  <h4 className="text-gray-700 font-semibold text-sm mb-2">
                    {dateLabel}
                  </h4>
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className="p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex space-x-3 w-[95%] items-center">
                        <div
                          className={`notifTypeIcon w-1 h-14 rounded-full flex items-center justify-center
                          ${
                            notif.type === "subscription_expiry"
                              ? "bg-red-200"
                              : notif.type === "store_access_request"
                              ? "bg-blue-200"
                              : "bg-yellow-200"
                          }
                        `}
                        ></div>

                        <div className="flex flex-col w-[95%]">
                          <p className="text-gray-800 text-sm font-medium">
                            {notif.message}
                          </p>
                          <span className="text-gray-500 text-xs">
                            {formatTime(notif.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ArchiveBoxIcon
                          className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                            !submitionLoading
                              ? "text-gray-300 hover:text-red-500"
                              : "text-red-300"
                          }`}
                          onClick={() =>
                            handleSubmitMarkNotificationAsRead(notif._id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress color="inherit" size={20} />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center relative">
        <div
          className="flex items-center cursor-pointer justify-between w-[300px]"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="flex space-x-3 items-center">
            <div className="w-[48px] h-[48px] rounded-full bg-slate-500"></div>
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium text-[14px]">
                {user?.infos?.firstName} {user?.infos?.lastName}
              </p>
              <span className="text-gray-500 text-sm">
                {user?.infos?.phoneNumber}
              </span>
            </div>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </div>

        <div
          className={`absolute right-0 top-12 w-[250px] bg-white shadow-lg rounded-xl border border-gray-200 z-20 transform
          ${
            showUserMenu
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          } transition-transform duration-200 ease-out`}
        >
          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-gray-800 font-semibold">
              {user?.infos?.firstName} {user?.infos?.lastName}
            </p>
            <span className="text-gray-500 text-sm">{user?.infos?.email}</span>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <NavLink
              to="/Settings"
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
              <p className="text-gray-700 text-sm">Settings</p>
            </NavLink>
            <NavLink
              to="/"
              onClick={submitLogout}
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-red-600" />
              <p className="text-red-600 text-sm">Logout</p>
            </NavLink>
          </div>
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
