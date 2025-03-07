import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import DashboardLatestSubscription from "../components/DashboardLatestSubscription";
import DashboadStoreStatistic from "../components/DashboadStoreStatistic";
import DashboardNewCostumers from "../components/DashboardNewCostumers";
import DashboardChart from "../components/DashboardChart";
import DashboardCalendar from "../components/DashboardCalendar";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // Update dashboard content based on the selected date range
      updateDashboardContent(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange]);

  const updateDashboardContent = (startDate, endDate) => {
    // Logic to update dashboard content based on selected date range
    console.log("Selected range:", startDate, endDate);
    // Fetch or filter data based on date range and update dashboard content
  };
  return (
    <div className="pagesContainer scrollPage">
      <Header />
      <div className="w-full flex items-center justify-between">
        <div className="flex-col space-y-[6px]">
          <h2 className="pagesTitle">Bienvenue, Amine Faroukhi</h2>
          <span className="pagesSousTitle">
            Here's you current sales overview
          </span>
        </div>
        <DashboardCalendar
          onDateChange={(start, end) =>
            setDateRange({ startDate: start, endDate: end })
          }
        />
      </div>
      <div className="flex items-center space-x-6">
        <DashboardCard
          dashboardCardTitle="Total Amount"
          dashboardCardAmount={0}
        />
        <DashboardCard
          dashboardCardTitle="Total Subscription"
          dashboardCardAmount={0}
        />
        <DashboardCard dashboardCardTitle="Profit" dashboardCardAmount={0} />
      </div>
      <div className="flex items-center justify-between space-x-6">
        <DashboardChart />
        <DashboardNewCostumers />
      </div>
      <DashboardLatestSubscription />
      <div className="w-full flex justify-between space-x-6">
        <DashboadStoreStatistic />
      </div>
    </div>
  );
}
