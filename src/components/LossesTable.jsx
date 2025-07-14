import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { formatDate } from "../util/useFullFunctions";
import Modal from "react-modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";
import { TokenDecoder } from "../util/DecodeToken";
import { useAuthContext } from "../hooks/useAuthContext";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="tableRow"
      >
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.reason}</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.price} DA</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{formatDate(row.date)}</span>
        </TableCell>
        <TableCell align="right" className="tableCell">
          <div className="flex justify-end pr-3">
            <TrashIcon
              className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => props.handleDeleteClick(row._id)}
            />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function LossesTable({ searchQuery, setFilteredData, data, loading , refetchLossesData}) {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const [isDeleteLossOpen, setIsDeleteLossOpen] = useState(false);
  const [selectedLossId, setSelectedLossId] = useState(null);

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseDeleteLossClick = (id) => {
    setSelectedLossId(id);
    setIsDeleteLossOpen(true);
  };

  const handleCloseDeleteLoss = () => {
    setSelectedLossId(null);
    setIsDeleteLossOpen(false);
  };

  const handleSubmitCreateLoss = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.delete(import.meta.env.VITE_APP_URL_BASE+`/Losses/admin/${selectedLossId}/${decodedToken.id}`,
        {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            }
        }
      );
      if (response.status === 200) {
        refetchLossesData();
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
        handleCloseDeleteLoss();
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
          console.error("Error deleting loss: No response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error deleting loss", error);
        }
    }
  }

  return (
    <>
      <TableContainer
        className="tablePages"
        component={Paper}
        style={{ boxShadow: "none" }}
      >
        <Table aria-label="collapsible table" className="table">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell className="tableCell">
                <span className="thTableSpan">Cause</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Amount</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Date</span>
              </TableCell>
              <TableCell align="right" className="tableCell">
                <span className="thTableSpan">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress color="inherit" />
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data.map((row) => <Row key={row._id} row={row} handleDeleteClick={handleCloseDeleteLossClick}/>)
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <span className="thTableSpan">No losses found</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={isDeleteLossOpen}
        onConfirm={handleSubmitCreateLoss}
        onClose={handleCloseDeleteLoss}
        dialogTitle="Confirm deletion"
        dialogContentText={`Are you sure you want to delete this loss?`}
        isloading={submitionLoading}
      />
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity= {alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
