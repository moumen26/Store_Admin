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
import { PencilIcon } from "@heroicons/react/16/solid";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  const [openShowPersonalInfo, setOpenShowPersonalInfo] = useState(false);
  const handleOpenPersonalInfoModal = () => {
    setOpenShowPersonalInfo(true);
  };
  const handleClosePersonalInfoModal = () => {
    setOpenShowPersonalInfo(false);
    setSelectedRow(null);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelectRow = (row) => {
    setSelectedRow(row);
  }

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
            onClick={()=>{
              handleSelectRow(row);
              handleOpenPersonalInfoModal();
            }}
          />
        </div>
      </TableCell>

      {selectedRow &&
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
                <h3 className="personalInformationDetails">
                  {selectedRow?.r_commerce}
                </h3>
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
      }
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
  loading = false,
}) {
  const [filteredRows, setFilteredRows] = useState([]);

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
    </TableContainer>
  );
}
