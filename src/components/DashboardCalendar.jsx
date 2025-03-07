import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // Import your theme
import "primereact/resources/primereact.min.css"; // Import PrimeReact core styles
import "primeicons/primeicons.css"; // Import PrimeIcons

export default function DashboardCalendar({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date(); // Get today's date

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null); // Clear end date if it is before the new start date
    }
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div className="dateRangeSelector">
      <div className="flex DateRangeSelector">
        <div className="flex items-center space-x-4 dateRangeSelectorContainer">
          <label htmlFor="startDate">Start Date :</label>
          <Calendar
            id="startDate"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.value)}
            showIcon
            dateFormat="dd-mm-yy"
            className="calendar"
            style={{ outline: "none" }}
            maxDate={today} // Prevent selecting future dates
          />
        </div>
        <div className="flex items-center space-x-4 dateRangeSelectorContainer">
          <label htmlFor="endDate">End Date :</label>
          <Calendar
            id="endDate"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.value)}
            showIcon
            dateFormat="dd-mm-yy"
            className="calendar"
            disabled={!startDate} // Disable end date calendar if start date is not selected
            minDate={startDate} // Set minimum selectable date for end date calendar
            maxDate={today} // Prevent selecting future dates
          />
        </div>
      </div>
    </div>
  );
}
