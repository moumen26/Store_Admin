import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { TokenDecoder } from "../util/DecodeToken";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useQuery } from "@tanstack/react-query";
// import { formatDate } from "../util/useFullFunctions";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (stockId) => {
    setSelectedStockId(stockId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStockId(null);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="tableRow"
      >
        <TableCell component="th" scope="row" className="tableCell">
          <span className="trTableSpan"></span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan"></span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan"></span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan"></span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan"></span>
        </TableCell>
        <TableCell align="right" className="tableCell">
          <div className="flex justify-end pr-3">
            <EyeIcon
              className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleViewClick}
            />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PublicitéTable({ searchQuery, setFilteredData }) {
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
                <span className="thTableSpan">Store_ID</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Customer Name</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Phone Number</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Wilaya</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Address</span>
              </TableCell>
              <TableCell align="right" className="tableCell">
                <span className="thTableSpan">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {PurchasesLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress color="inherit" />
                </TableCell>
              </TableRow>
            ) : PurchasesData.length > 0 ? (
              PurchasesData.map((row) => <Row key={row._id} row={row} />)
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <span className="thTableSpan">No losses found</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
    </>
  );
}
