import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { Add } from "@mui/icons-material";
import axios from "axios";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { TokenDecoder } from "../util/DecodeToken";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row, handleConfirmAlert, handleRefetchDataChange } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();

  const [open, setOpen] = useState(false);
  const handleInactiveClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openShowPersonalInfo, setOpenShowPersonalInfo] = useState(false);
  const handleOpenPersonalInfoModal = () => {
    setOpenShowPersonalInfo(true);
  };

  const handleClosePersonalInfoModal = () => {
    setOpenShowPersonalInfo(false);
  };


    //---------------------------------API calls---------------------------------\\

  // Define a function that fetches the store data
  const fetchStoreData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Store/${row._id}`,
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
    queryKey: ["StoreData", user?.token, location.key, row._id],
    queryFn: fetchStoreData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: refetching on window focus
  });
  
  const [submitionLoading, setSubmitionLoading] = useState(false);
  const handleConfirm = async (subscriptionID, expiryMonths) => {
    try {
      setSubmitionLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/SubscriptionStore/create/admin/${decodedToken?.id}`,
        {
          Store: row._id,
          Subscription: subscriptionID,
          expiryMonths: expiryMonths,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        handleConfirmAlert(`${response.data.message}`, true);
        handleRefetchDataChange();
        setSubmitionLoading(false);
      } else {
        handleConfirmAlert(`${response.data.message}`, false);
        setSubmitionLoading(false);
      }
    } catch (error) {
      if (error.response) {
        handleConfirmAlert(`${error.response.data.message}`, false);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error creating subscription: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating subscription", error);
      }
    }
  };


  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="tableRow">
      <TableCell className="tableCell">
        <span className="trTableSpan">
          <span className="mr-1 trTableSpan">{row.firstName}</span>
          <span className="trTableSpan">{row.lastName}</span>
        </span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.email}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.wilaya}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.commune}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.storeAddress}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.storeName}</span>
      </TableCell>
      <TableCell className="tableCell">
        <div className="activeClass" onClick={handleInactiveClick}>
          <div className="cercleActive"></div>
          <span className="inactiveSpan trTableSpan">Pending</span>
        </div>
      </TableCell>

      <TableCell align="right" className="tableCell">
        <div className="flex justify-end pr-3">
          <EyeIcon
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleOpenPersonalInfoModal}
          />
        </div>
      </TableCell>

      <AddSubscriptionDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        dialogTitle="Add new subscription"
        dialogContentText="Are you sure you want to add a new subscription?"
        isloading={submitionLoading}
      />

      <Modal
        isOpen={openShowPersonalInfo}
        onRequestClose={handleClosePersonalInfoModal}
        contentLabel="Show Personal Information"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            border: "none",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "80%",
            margin: "auto",
            height: "fit-content",
            zIndex: 1001,
            overflowY: "auto",
          },
        }}
      >
        <div className="customerClass pb-0">
          <h2 className="customerClassTitle">Personal Information</h2>
          {!StoreDataLoading ?
            <div className="personalInformation">
              {StoreData?.firstName && (
                <div className="flex-col">
                  <span className="personalInformationSpan">First Name</span>
                  <h3 className="personalInformationDetails">{StoreData.firstName}</h3>
                </div>
              )}
              
              {StoreData?.lastName && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Last Name</span>
                  <h3 className="personalInformationDetails">{StoreData.lastName}</h3>
                </div>
              )}
              
              {StoreData?.phoneNumber && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Number Phone</span>
                  <h3 className="personalInformationDetails">{StoreData.phoneNumber}</h3>
                </div>
              )}
              
              {StoreData?.email && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Email Address</span>
                  <h3 className="personalInformationDetails">{StoreData.email}</h3>
                </div>
              )}
              
              {StoreData?.r_commerce && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Commercial register number</span>
                  <h3 className="personalInformationDetails">{StoreData.r_commerce}</h3>
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
                  <h3 className="personalInformationDetails">{StoreData.commune}</h3>
                </div>
              )}
              
              {StoreData?.storeAddress && (
                <div 
                  className="flex-col" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => Redirect(StoreData.storeLocation)}
                >
                  <span className="personalInformationSpan">Address</span>
                  <h3 className="personalInformationDetails">{StoreData.storeAddress}</h3>
                </div>
              )}
              
              {StoreData?.storeName && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Store name</span>
                  <h3 className="personalInformationDetails">{StoreData.storeName}</h3>
                </div>
              )}
              
              {StoreData?.status && (
                <div className="flex-col">
                  <span className="personalInformationSpan">Status</span>
                  <h3 className="personalInformationDetails">{StoreData.status}</h3>
                </div>
              )}
              
            </div>
            :
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress color="inherit" />
            </div>
          }
          <div className="flex justify-end space-x-8 mt-[20px]">
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleClosePersonalInfoModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};
export default function CustomerTable({
  searchQuery,
  setFilteredData,
  data,
  isLoading = false,
  handleRefetchDataChange,
}) {
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    setFilteredRows(
      data?.filter(
        (row) =>
          row?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.wilaya?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.commune?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.storeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.storeAddress?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredRows);
  }, [filteredRows, setFilteredData, data, isLoading]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertType, setAlertType] = useState(true);

  const handleConfirmAlert = (message, type) => {
    setAlertType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ boxShadow: "none" }}
      className="tablePages"
    >
      <Table aria-label="collapsible table">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell className="tableCell">
              <span className="thTableSpan">Full Name</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Phone Number</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Wilaya</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Commune</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Address</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Store name</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="thTableSpan">Status</span>
            </TableCell>
            <TableCell align="right" className="tableCell">
              <span className="thTableSpan">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : filteredRows?.length > 0 ? (
            filteredRows.map((row) => (
              <Row
                key={row._id}
                row={row}
                handleConfirmAlert={handleConfirmAlert}
                handleRefetchDataChange={handleRefetchDataChange}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <span className="thTableSpan">No store found</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={!alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}
