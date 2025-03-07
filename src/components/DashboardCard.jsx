import {
  BanknotesIcon,
  CircleStackIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/16/solid";
import React from "react";

export default function DashboardCard({
  dashboardCardTitle,
  dashboardCardAmount,
}) {
  let iconComponent;

  switch (dashboardCardTitle) {
    case "Profit":
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
    case "Total Orders":
      iconComponent = <DocumentChartBarIcon className="iconPages" />;
      break;
    case "Total Amount":
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
    default:
      iconComponent = <CircleStackIcon className="iconPages" />;
      break;
  }

  return (
    <div className="dashboardCard">
      <div className="flex justify-between items-center">
        <h3 className="dashboardCardTitle">{dashboardCardTitle}</h3>
        <div className="bg-white w-[50px] h-[50px] rounded-lg flex items-center justify-center">
          {iconComponent}
        </div>
      </div>
      <div>
        <h2 className="dashboardCardAmount">DA {dashboardCardAmount}</h2>
      </div>
    </div>
  );
}
