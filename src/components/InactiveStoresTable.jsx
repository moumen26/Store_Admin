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
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import axios from "axios";
import { TokenDecoder } from "../util/DecodeToken";

function Row(props) {
  const { row, handleConfirmAlert, handleRefetchDataChange } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();

  const handleViewClick = () => {
    navigate(`/CustomerProfile/${row._id}`);
  };
  const [open, setOpen] = useState(false);
  const handleInactiveClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <span className="trTableSpan">{row._id}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">
          <span className="mr-1 trTableSpan">{row.firstName}</span>
          <span className="trTableSpan">{row.lastName}</span>
        </span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.phoneNumber}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.wilaya}</span>
      </TableCell>
      <TableCell align="right" className="tableCell">
        <span className="trTableSpan">{row.commune}</span>
      </TableCell>
      <TableCell className="tableCell">
        <div className="activeClass" onClick={handleInactiveClick}>
          <div className="cercleActive"></div>
          <span className="inactiveSpan trTableSpan">Suspended</span>
        </div>
      </TableCell>
      <TableCell align="right" className="tableCell">
        <div className="flex justify-end pr-3">
          <EyeIcon
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleViewClick}
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
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function InactiveStores({ 
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
          row?.commune?.toLowerCase().includes(searchQuery.toLowerCase())
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
    <>
      <TableContainer
        className="tablePages"
        component={Paper}
        style={{ boxShadow: "none" }}
      >
        <Table aria-label="collapsible table" className="table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">
                <span className="thTableSpan">Store_ID</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Name</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Phone Number</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Wilaya</span>
              </TableCell>
              <TableCell align="right" className="tableCell">
                <span className="thTableSpan">Commune</span>
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
              <TableCell colSpan={7} align="center">
                <CircularProgress color="inherit" />
              </TableCell>
            </TableRow>
          ) : filteredRows?.length > 0 ? (
            filteredRows.map((row) => <Row 
              key={row._id}
              row={row}
              handleConfirmAlert={handleConfirmAlert}
              handleRefetchDataChange={handleRefetchDataChange}
            />)
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
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
    </>
  );
}
