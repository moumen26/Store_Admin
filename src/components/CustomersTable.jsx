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
    // navigate(`/customers/${row.customerId}`);

    navigate("/CustomerProfile", { state: { customer: row } });
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="tableRow">
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.customerId}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">
          <span className="mr-1 trTableSpan">{row.customerFirstName}</span>
          <span className="trTableSpan">{row.customerLastName}</span>
        </span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.customerPhone}</span>
      </TableCell>
      <TableCell className="tableCell">
        <span className="trTableSpan">{row.customerWilaya}</span>
      </TableCell>
      <TableCell align="right" className="tableCell">
        <span className="trTableSpan">{row.customerCommune}</span>
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
    customerId: PropTypes.string.isRequired,
    customerWilaya: PropTypes.string.isRequired,
    customerPhone: PropTypes.string.isRequired,
    customerLastName: PropTypes.string.isRequired,
    customerFirstName: PropTypes.string.isRequired,
    customerCommune: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CustomersTable({ searchQuery, setFilteredData }) {
  const rows = [
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
      customerPrimaryDeliveryAddress: [
        "123 Rue Yousfi Abdelkader, Ouled Aich Blida, Algerie",
        "345 Rue Yousfi Abdelkader, Ouled Aich Blida, Algerie",
      ],
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Adel",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Blida",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Mohamed",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Bouarfa",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Adel",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
    {
      customerFirstName: "Khaldi",
      customerLastName: "Abdelmoumen",
      customerId: "0920496",
      customerPhone: "0550189087",
      customerWilaya: "Blida",
      customerCommune: "Ouled Aich",
      customerEmail: "moumenkhaldi26@gmail.com",
      customerPostcode: "3100",
      customerAddress: "Rue Yousfi Abdelkader",
    },
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.customerLastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customerFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customerWilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customerCommune.toLowerCase().includes(searchQuery.toLowerCase())
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
              <span className="thTableSpan">Customer_ID</span>
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
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => <Row key={row.customerId} row={row} />)
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
