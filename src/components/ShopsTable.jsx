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

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row, handleConfirmAlert, handleRefetchDataChange } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();

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

  const [openShowPersonalInfo, setOpenShowPersonalInfo] = useState(false);
  const handleOpenPersonalInfoModal = () => {
    setOpenShowPersonalInfo(true);
  };

  const handleClosePersonalInfoModal = () => {
    setOpenShowPersonalInfo(false);
  };

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const handleConfirm = async (subscriptionID, expiryMonths) => {
    try {
      setSubmitionLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/SubscriptionStore/create`,
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
        <span className="trTableSpan"></span>
      </TableCell>
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
      <TableCell align="right" className="tableCell">
        <div className="flex justify-end pr-3">
          <EyeIcon
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleOpenPersonalInfoModal}
          />
        </div>
      </TableCell>

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
          <div className="w-[100%] flex justify-between items-center">
            <h2 className="customerClassTitle">Personal Information</h2>
            {isEditing ? (
              <div className="flex space-x-4">
                <XMarkIcon
                  className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={handleEditToggle}
                />
                <CheckIcon
                  className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-700"
                  // onClick={}
                />
              </div>
            ) : (
              <PencilIcon
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleEditToggle}
              />
            )}
          </div>
          <div className="personalInformation mt-[16px]">
            <div className="flex-col">
              <span className="personalInformationSpan">First Name</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerFirstName} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Last Name</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerLastName} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Number Phone</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerPhone} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Email Address</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerEmail} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Wilaya</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerWilaya} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Commune</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerCommune} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Postcode</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerPostcode} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">Address</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerAddress} */}
              </h3>
            </div>
            <div className="flex-col">
              <span className="personalInformationSpan">ID</span>
              <h3 className="personalInformationDetails">
                {/* {customer.customerId} */}
              </h3>
            </div>
            <div className="flex-col PersonalInfoModal">
              <span className="personalInformationSpan">
                Commercial register number
              </span>
              {isEditing ? (
                <div className="inputForm flex items-center">
                  <input
                    type="text"
                    name="registerNumber"
                    // value={}
                    // onChange={}
                    className="inputField"
                  />
                </div>
              ) : (
                <h3 className="personalInformationDetails"></h3>
              )}
            </div>
          </div>
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
export default function ShopsTable({
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
              <span className="thTableSpan">Shop_ID</span>
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
            <TableCell className="tableCell">
              <span className="thTableSpan">Commune</span>
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
                handleRefetchDataChange={handleRefetchDataChange}
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
