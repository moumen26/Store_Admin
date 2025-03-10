import React from "react";
import DashboardNewCostumerItem from "./DashboardNewCostumerItem";
import { CircularProgress } from "@mui/material";

export default function DashboardNewCostumers({
  StoreAccessRequests,
  StoreAccessRequestsLoading
}) {  
  return (
    <div className="dashboardNewCostumers">
      <div className="w-full flex items-center justify-between">
        <h3 className="dashboardTitleItem">Nouveaux demandes d'accès</h3>
      </div>
      <div className="flex-col h-[410px] space-y-6">
        {!StoreAccessRequestsLoading ? (
          StoreAccessRequests?.length > 0 ? (
            StoreAccessRequests.map((item, index) => (
              <DashboardNewCostumerItem
                key={index}
                CostumerName={
                  item.store?.firstName + " " + item.store?.lastName
                }
                CostumerId={item.store?._id}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="thTableSpan">Aucune demande d'accès disponible</span>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
    </div>
  );
}
