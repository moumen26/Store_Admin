import { BanknotesIcon, DocumentChartBarIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function CustomerStatsCard({
  customerStatsCardTitle,
  customerStatsCardDetails,
}) {
  let iconComponent;

  switch (customerStatsCardTitle) {
    case "Total Abonnements":
      iconComponent = <DocumentChartBarIcon className="iconPages" />;
      break;
    case "Total Amount":
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
    default:
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
  }

  let spanComponent;

  switch (customerStatsCardTitle) {
    case "Total Abonnements":
      spanComponent = "";
      break;
    case "Total Amount":
      spanComponent = " DA";
      break;
    default:
      spanComponent = <BanknotesIcon className="iconPages" />;
      break;
  }
  return (
    <div className="customerStatsCard">
      <div className="flex justify-between items-center">
        <h3 className="dashboardCardTitle flex items-center h-[50px]">
          {customerStatsCardTitle}
        </h3>
        {iconComponent}
      </div>
      <span className="dashboardCardAmount">
        {customerStatsCardDetails}
        {spanComponent}
      </span>
    </div>
  );
}
