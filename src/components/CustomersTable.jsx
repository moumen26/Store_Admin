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
import { CircularProgress } from "@mui/material";

function Row(props) {
  const { row } = props;
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/CustomerProfile/${row._id}`);
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
      <TableCell align="right" className="tableCell">
        <div className="flex justify-end pr-3">
          <EyeIcon
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleViewClick}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function CustomersTable({
  searchQuery,
  setFilteredData,
  data,
  isLoading = false,
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
            <TableCell align="right" className="tableCell">
              <span className="thTableSpan">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress color="inherit" />
              </TableCell>
            </TableRow>
          ) : filteredRows?.length > 0 ? (
            filteredRows.map((row) => <Row key={row._id} row={row} />)
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <span className="thTableSpan">No store found</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
