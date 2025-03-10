import {
  BanknotesIcon,
  CircleStackIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/16/solid";
import { CircularProgress } from "@mui/material";
import React from "react";

export default function DashboardCard({
  dashboardCardTitle,
  dashboardCardAmount,
  OrdersStatsLoading = false,
}) {
  let iconComponent;

  switch (dashboardCardTitle) {
    case "Profit":
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
    case "Total des abonnements":
      iconComponent = <CircleStackIcon className="iconPages" />;
      break;
    case "Montant total":
      iconComponent = <BanknotesIcon className="iconPages" />;
      break;
    default:
      iconComponent = <DocumentChartBarIcon className="iconPages" />;
      break;
  }

  return (
    <div className="dashboardCard">
      {!OrdersStatsLoading ?
        <>
          <div className="flex justify-between items-center">
            <h3 className="dashboardCardTitle">{dashboardCardTitle}</h3>
            <div className="bg-white w-[50px] h-[50px] rounded-lg flex items-center justify-center">
              {iconComponent}
            </div>
          </div>
          <div>
            <h2 className="dashboardCardAmount">{dashboardCardAmount} {dashboardCardTitle != "Total orders" ? 'DA' : ''}</h2>
          </div>
        </>
        :
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
      }
    </div>
  );
}
