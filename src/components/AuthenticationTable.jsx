import * as React from "react";
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

function Row(props) {
  const { row } = props;
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/user/${row.userId}`);
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="tableRow">
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.userName}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.userPhone}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.userWilaya}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.userCommune}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.userAddress}</span>
      </TableCell>
      <TableCell className="tableCell">
        <div className="activeClass">
          <div className="cercleActive"></div>
          <span className="inactiveSpan trTableSpan">Pending</span>
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
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userWilaya: PropTypes.string.isRequired,
    userPhone: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userCommune: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CustomerTable({ searchQuery, setFilteredData }) {
  const rows = [
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },

    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },

    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Adel",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
    {
      userName: "Khaldi Abdelmoumen",
      userId: "0920496",
      userPhone: "0550189087",
      userWilaya: "Blida",
      userCommune: "Ouled Aich",
      userAddress: "Rue Yousfi Abdelkader",
    },
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.userPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.userWilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.userCommune.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    setFilteredData(filteredRows);
  }, [filteredRows, setFilteredData]);

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
              <span className="thTableSpan">Status</span>
            </TableCell>
            <TableCell align="right" className="tableCell">
              <span className="thTableSpan">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => <Row key={row.userId} row={row} />)
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <span className="thTableSpan">No customers found</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
