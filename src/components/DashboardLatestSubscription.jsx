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
import moment from "moment";
import Modal from "react-modal";
import { formatDate, getCurrentDate } from "../util/useFullFunctions";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  const [remainingTime, setRemainingTime] = useState("");

  const calculateRemainingTime = () => {
    const currentDate = getCurrentDate();
    const startDate = moment(row.startDate);
    const expiryDate = moment(row.expiryDate);

    const duration = moment.duration(expiryDate.diff(currentDate));

    // Check if the subscription is expired
    if (duration.asMilliseconds() <= 0) {
      const durationE = moment.duration(expiryDate.diff(startDate));
      const totalMonthsE = Math.floor(durationE.asMonths());
      const monthsDurationE = moment.duration(totalMonthsE, "months");
      const remainingDurationE = moment.duration(
        durationE.asMilliseconds() - monthsDurationE.asMilliseconds()
      );

      const remainingDaysE = Math.floor(remainingDurationE.asDays());

      let resultE = "";
      if (totalMonthsE > 0) {
        resultE += `${totalMonthsE} month${totalMonthsE > 1 ? "s" : ""}`;
      }

      if (remainingDaysE > 0) {
        resultE += ` ${remainingDaysE} day${remainingDaysE > 1 ? "s" : ""}`;
      }

      return resultE.trim();
    }

    const totalMonths = Math.floor(duration.asMonths());
    const monthsDuration = moment.duration(totalMonths, "months");
    const remainingDuration = moment.duration(
      duration.asMilliseconds() - monthsDuration.asMilliseconds()
    );

    const remainingDays = Math.floor(remainingDuration.asDays());
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");

    let result = "";

    if (totalMonths > 0) {
      result += `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
    }

    if (remainingDays > 0) {
      result += ` ${remainingDays} day${remainingDays > 1 ? "s" : ""}`;
    }

    result += ` ${hours}:${minutes}:${seconds}`;

    return result.trim();
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    const expiryDate = moment(row.expiryDate);

    setRemainingTime(calculateRemainingTime());

    const interval = setInterval(() => {
      const newDuration = moment.duration(expiryDate.diff(currentDate));
      if (newDuration.asMilliseconds() <= 0) {
        setRemainingTime(calculateRemainingTime());
        clearInterval(interval);
      } else {
        setRemainingTime(calculateRemainingTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [row.startDate, row.expiryDate]);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="tableRow"
      >
        <TableCell component="th" scope="row" className="tableCell">
          <span className="trTableSpan">{row?.subscription.name}</span>
        </TableCell>

        <TableCell className="tableCell">
          <span className="trTableSpan">{formatDate(row?.startDate)}</span>
        </TableCell>

        <TableCell className="tableCell">
          <span className="trTableSpan">{formatDate(row?.expiryDate)}</span>
        </TableCell>

        <TableCell className="tableCell">
          <span className="trTableSpan">{row?.amount} DA</span>
        </TableCell>

        <TableCell className="tableCell">
          <span className="trTableSpan">{remainingTime}</span>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DashboardLatestSubscription({
  searchQuery,
  setFilteredData,
  data,
  loading,
  handleRefetchDataChange,
}) {
  return (
    <div className="dashboardLatestOrders justify-start space-y-2">
      <div className="w-full flex items-center justify-between">
        <h3 className="dashboardTitleItem">Latest Subscription</h3>
      </div>
      <TableContainer
        className="tablePages"
        component={Paper}
        style={{ boxShadow: "none" }}
      >
        <Table aria-label="collapsible table" className="table">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell className="tableCell">
                <span className="thTableSpan">Type Abonnement</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Start date</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Expiry date</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Amount</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Durée</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress color="inherit" />
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data?.map((row) => <Row key={row._id} row={row} />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <span className="thTableSpan">No abonnement found</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
