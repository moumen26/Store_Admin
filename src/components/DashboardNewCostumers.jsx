import React from "react";
import DashboardNewCostumerItem from "./DashboardNewCostumerItem";

const newCostumerData = [
  {
    CostumerName: "Khaldi Abdelmoumen",
    CostumerId: "0920496",
  },
  {
    CostumerName: "Boumrar Zineddein",
    CostumerId: "0920496",
  },
  {
    CostumerName: "Khaldi Abdelmoumen",
    CostumerId: "0920496",
  },
];

export default function DashboardNewCostumers() {
  return (
    <div className="dashboardNewCostumers">
      <div className="w-full flex items-center justify-between">
        <h3 className="dashboardTitleItem">New Costumers</h3>
      </div>
      <div className="flex-col h-[410px] space-y-6">
        {newCostumerData.map((costumer, index) => (
          <DashboardNewCostumerItem
            key={index}
            CostumerName={costumer.CostumerName}
            CostumerId={costumer.CostumerId}
          />
        ))}
      </div>
    </div>
  );
}
