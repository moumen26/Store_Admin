import React from "react";

export default function OrderCard({ orderCardTitle, orderCardDetails }) {
  return (
    <div className="orderCard">
      <h3 className="dashboardCardTitle flex items-center h-[50px]">
        {orderCardTitle}
      </h3>
      <h2 className="dashboardCardAmount">{orderCardDetails}</h2>
    </div>
  );
}
