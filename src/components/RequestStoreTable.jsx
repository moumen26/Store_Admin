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
import ConfirmDialog from "./ConfirmDialog";

import axios from "axios";
import { TokenDecoder } from "../util/DecodeToken";
import { formatDate } from "../util/useFullFunctions";

function Row(props) {
  const { row, handleConfirmAlert, handleRefetchDataChange } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();

  const handleViewClick = () => {
    navigate(`/CustomerProfile/${row?.store?._id}`);
  };
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const handleValidateRequest = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_APP_URL_BASE +
          `/SubscriptionStore/validate/${decodedToken?.id}/${row._id}`,
        {},
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
        console.error("Error validating subscription: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error validating subscription", error);
      }
    }
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="tableRow">
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.store?.storeName}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">
          <span className="mr-1 trTableSpan">{row?.store?.firstName}</span>
          <span className="trTableSpan">{row?.store?.lastName}</span>
        </span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.store?.phoneNumber}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.subscription?.name}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.amount} DA</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{formatDate(row?.startDate)}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{formatDate(row?.expiryDate)}</span>
      </TableCell>
      <TableCell className="tableCell">
        <div className="activeClass" onClick={handleOpenDialog}>
          <div className="cercleActive"></div>
          <span className="inactiveSpan trTableSpan">Activate</span>
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
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleValidateRequest}
        dialogTitle="Activate Subscription"
        dialogContentText="Are you sure you want to activate this subscription?"
        isloading={submitionLoading}
      />
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function RequestStoreTable({
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
          row?.store?.firstName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.store?.lastName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.store?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.store?.phoneNumber
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.store?.storeName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.store?.startDate
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.subscription?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
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
                <span className="thTableSpan">Store name</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Full name</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Phone number</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Subscription</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Amount</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Start date</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Expiry date</span>
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
                <TableCell colSpan={9} align="center">
                  <CircularProgress color="inherit" />
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
                <TableCell colSpan={9} align="center">
                  <span className="thTableSpan">No requests found</span>
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
