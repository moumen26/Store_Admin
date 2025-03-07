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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Modal from "react-modal";
import ButtonDark from "./ButtonDark";
import { TokenDecoder } from "../util/DecodeToken";
import ConfirmDialog from "./ConfirmDialog";

import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ButtonAdd from "./ButtonAdd";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  const handleUpdatedRChange = (e) => {
    props.setUpdatedRC(e.target.value);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelectRow = (row) => {
    setSelectedRow(row);
    props.handleSelectRow(row);
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="tableRow">
      <TableCell className="tableCell">
        <span className="trTableSpan">
          <span className="mr-1 trTableSpan">{row?.firstName}</span>
          <span className="trTableSpan">{row?.lastName}</span>
        </span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.phoneNumber}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.wilaya}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row?.commune}</span>
      </TableCell>
      <TableCell align="right" className="tableCell">
        <div className="flex justify-end pr-3">
          <EyeIcon
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => {
              handleSelectRow(row);
              props.handleOpenPersonalInfoModal();
            }}
          />
        </div>
      </TableCell>

      {selectedRow && (
        <>
          <Modal
            isOpen={props.openShowPersonalInfo}
            onRequestClose={props.handleClosePersonalInfoModal}
            contentLabel="Show Personal Information"
            className="addNewModal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              },
            }}
          >
            <div className="customerClass pb-0">
              <div className="w-[100%] flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                  <h2 className="customerClassTitle">Personal Information</h2>
                  {!selectedRow?.isRCVerified && (
                    <>
                      {props.isEditing ? (
                        <XMarkIcon
                          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                          onClick={props.handleCloseEditToggle}
                        />
                      ) : (
                        <PencilIcon
                          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                          onClick={props.handleOpenEditToggle}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!selectedRow?.isRCVerified && (
                    <ButtonAdd
                      showIcon={false}
                      buttonSpan="Verifie"
                      setOnClick={props.handleOpenVerifieClientConfirmation}
                    />
                  )}
                  <ButtonAdd
                    showIcon={false}
                    buttonSpan="Unblock"
                    setOnClick={props.handleOpenUnBlockClientConfirmation}
                  />
                </div>
              </div>
              <div className="personalInformation mt-[16px]">
                <div className="flex-col">
                  <span className="personalInformationSpan">First Name</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.firstName}
                  </h3>
                </div>
                <div className="flex-col">
                  <span className="personalInformationSpan">Last Name</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.lastName}
                  </h3>
                </div>
                <div className="flex-col">
                  <span className="personalInformationSpan">Number Phone</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.phoneNumber}
                  </h3>
                </div>
                <div className="flex-col">
                  <span className="personalInformationSpan">Email Address</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.email}
                  </h3>
                </div>
                <div className="flex-col">
                  <span className="personalInformationSpan">Wilaya</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.wilaya}
                  </h3>
                </div>
                <div className="flex-col">
                  <span className="personalInformationSpan">Commune</span>
                  <h3 className="personalInformationDetails">
                    {selectedRow?.commune}
                  </h3>
                </div>
                <div className="flex-col PersonalInfoModal">
                  <span className="personalInformationSpan">
                    Commercial register number
                  </span>
                  {props.isEditing ? (
                    <div className="inputForm flex items-center">
                      <input
                        type="text"
                        name="registerNumber"
                        value={props.updatedRC}
                        onChange={handleUpdatedRChange}
                        className="inputField"
                      />
                    </div>
                  ) : (
                    <h3 className="personalInformationDetails">
                      {selectedRow?.r_commerce}
                    </h3>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-8 mt-[20px]">
                <button
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={props.handleClosePersonalInfoModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          <ConfirmDialog
            open={props.openUnBlockClientConfirmation}
            onClose={props.handleCloseUnBlockClientConfirmation}
            onConfirm={props.handleConfirmUnBlockClient}
            dialogTitle={"Confirm unblock client"}
            dialogContentText={`Are you sure you want to unblock ${selectedRow?.firstName} ${selectedRow?.lastName} ?`}
            isloading={props.submitionLoading}
          />

          <ConfirmDialog
            open={props.openVerifieClientConfirmation}
            onClose={props.handleCloseVerifieClientConfirmation}
            onConfirm={props.handleConfirmVerifieClient}
            dialogTitle={"Confirm verifie client"}
            dialogContentText={`Are you sure you want to verifie ${selectedRow?.firstName} ${selectedRow?.lastName} ?`}
            isloading={props.submitionLoading}
          />
        </>
      )}
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};
export default function BlockedShopsTable({
  searchQuery,
  setFilteredData,
  data,
  loading = false,
  refetchClientData,
}) {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const [filteredRows, setFilteredRows] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelectRow = (row) => {
    setSelectedRow(row);
  };

  const [updatedRC, setUpdatedRC] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const handleCloseEditToggle = () => {
    setIsEditing(false);
    setUpdatedRC(null);
  };
  const handleOpenEditToggle = () => {
    setIsEditing(true);
  };

  const [openShowPersonalInfo, setOpenShowPersonalInfo] = useState(false);
  const handleOpenPersonalInfoModal = () => {
    setOpenShowPersonalInfo(true);
  };
  const handleClosePersonalInfoModal = () => {
    setOpenShowPersonalInfo(false);
    setSelectedRow(null);
    setUpdatedRC(null);
    setIsEditing(false);
  };

  const [openUnBlockClientConfirmation, setOpenUnBlockClientConfirmation] =
    useState(false);
  const handleOpenUnBlockClientConfirmation = () => {
    setOpenUnBlockClientConfirmation(true);
  };
  const handleCloseUnBlockClientConfirmation = () => {
    setOpenUnBlockClientConfirmation(false);
  };

  const [openVerifieClientConfirmation, setOpenVerifieClientConfirmation] =
    useState(false);
  const handleOpenVerifieClientConfirmation = () => {
    setOpenVerifieClientConfirmation(true);
  };
  const handleCloseVerifieClientConfirmation = () => {
    setOpenVerifieClientConfirmation(false);
  };

  useEffect(() => {
    setFilteredRows(
      data?.filter(
        (row) =>
          row?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.wilaya?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.commune?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredRows);
  }, [filteredRows, setFilteredData, data, loading]);

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleConfirmUnBlockClient = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_APP_URL_BASE +
          `/Client/admin/unblock/${decodedToken.id}`,
        {
          client: selectedRow._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedRow(null);
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        refetchClientData();
        setSubmitionLoading(false);
        handleClosePersonalInfoModal();
        handleCloseUnBlockClientConfirmation();
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
        console.error("Error unblock client: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error unblock client", error);
      }
    }
  };

  const handleConfirmVerifieClient = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_APP_URL_BASE +
          `/Client/admin/verify/${decodedToken.id}`,
        {
          client: selectedRow._id,
          RC: updatedRC,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedRow(null);
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        refetchClientData();
        setSubmitionLoading(false);
        handleClosePersonalInfoModal();
        handleCloseVerifieClientConfirmation();
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
        console.error("Error verify client: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error verify client");
      }
    }
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
              <span className="thTableSpan">Name</span>
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
            <TableCell align="right" className="tableCell">
              <span className="thTableSpan">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
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
                handleSelectRow={handleSelectRow}
                submitionLoading={submitionLoading}
                handleConfirmUnBlockClient={handleConfirmUnBlockClient}
                handleConfirmVerifieClient={handleConfirmVerifieClient}
                setUpdatedRC={setUpdatedRC}
                updatedRC={updatedRC}
                isEditing={isEditing}
                handleCloseEditToggle={handleCloseEditToggle}
                handleOpenEditToggle={handleOpenEditToggle}
                openShowPersonalInfo={openShowPersonalInfo}
                handleOpenPersonalInfoModal={handleOpenPersonalInfoModal}
                handleClosePersonalInfoModal={handleClosePersonalInfoModal}
                openUnBlockClientConfirmation={openUnBlockClientConfirmation}
                handleOpenUnBlockClientConfirmation={
                  handleOpenUnBlockClientConfirmation
                }
                handleCloseUnBlockClientConfirmation={
                  handleCloseUnBlockClientConfirmation
                }
                openVerifieClientConfirmation={openVerifieClientConfirmation}
                handleOpenVerifieClientConfirmation={
                  handleOpenVerifieClientConfirmation
                }
                handleCloseVerifieClientConfirmation={
                  handleCloseVerifieClientConfirmation
                }
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <span className="thTableSpan">No shop found</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}
