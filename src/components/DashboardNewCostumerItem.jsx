import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import React from "react";

const colorArray = [
  "var(--mainColor)",
  "var(--neutralColor)",
  "var(--darkColor)",
  "var(--textColor)",
  "var(--lightColor)",
];

function getRandomColor() {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part[0]).join("");
  return initials.toUpperCase();
}

export default function DashboardNewCostumerItem({ CostumerName, CostumerId }) {
  const backgroundColor = getRandomColor();
  const initials = getInitials(CostumerName);
  return (
    <div className="flex items-center justify-between pl-[20px] pr-[20px]">
      <div className="flex items-center space-x-3">
        <div
          className="w-[50px] h-[50px] rounded-md flex items-center justify-center"
          style={{ backgroundColor }}
        >
          <span className="alphSpan">{initials}</span>
        </div>
        <div className="flex-col space-y-1">
          <h3 clcassName="dashboardText">{CostumerName}</h3>
          <p className="dashboardSpan">Customer ID #{CostumerId}</p>
        </div>
      </div>
      <EllipsisVerticalIcon className="iconAsideBar" />
    </div>
  );
}
