import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // Import your theme
import "primereact/resources/primereact.min.css"; // Import PrimeReact core styles
import "primeicons/primeicons.css"; // Import PrimeIcons

export default function DashboardCalendar({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  const handleStartDateChange = (date) => {
    if (date !== startDate) {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(null); // Reset end date if it's before the new start date
      }
      onDateChange(date, endDate);
    }
  };

  const handleEndDateChange = (date) => {
    if (date !== endDate) {
      setEndDate(date);
      onDateChange(startDate, date);
    }
  };

  return (
    <div className="dateRangeSelector">
      <div className="flex DateRangeSelector">
      <div className="flex items-center space-x-4 dateRangeSelectorContainer">
          <label htmlFor="startDate">Date de début :</label>
          <Calendar
            id="startDate"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.value)}
            showIcon
            dateFormat="dd-mm-yy"
            className="calendar"
            maxDate={today}
          />
        </div>
        <div className="flex items-center space-x-4 dateRangeSelectorContainer">
          <label htmlFor="endDate">Date de fin :</label>
          <Calendar
            id="endDate"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.value)}
            showIcon
            dateFormat="dd-mm-yy"
            className="calendar"
            disabled={!startDate}
            minDate={startDate}
            maxDate={today}
          />
        </div>
        <button
          className="relative text-gray-700 font-semibold transition-all duration-300 
             after:content-[''] after:absolute after:left-0 after:bottom-[10px] after:w-0 after:h-[1px] after:bg-gray-700 after:transition-all after:duration-300 
             hover:after:w-full"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            onDateChange(null, null);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
