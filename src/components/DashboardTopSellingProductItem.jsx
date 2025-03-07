import React from "react";

export default function DashboardTopSellingProductItem({
  ProductImage,
  ProductName,
  ProductSales,
  ProductStocks,
}) {
  return (
    <div className="dashboardTopSellingProductItem">
      <div className="flex items-center">
        <img className="productImg" src={ProductImage} alt={ProductName} />
        <div className="flex-col space-y-1">
          <h3 className="dashboardText">{ProductName}</h3>
          <p className="dashboardSpan">{ProductSales} Sales</p>
        </div>
      </div>
      <div className="flex-col space-y-1">
        <div className="flex items-center space-x-1">
          <div
            className={
              ProductStocks > 0
                ? "cercleAvailable cercleAvailableGreen"
                : "cercleAvailable cercleAvailableRed"
            }
          ></div>
          <span
            className={
              ProductStocks > 0
                ? "spanAvailable spanAvailableGreen"
                : "spanAvailable spanAvailableRed"
            }
          >
            {ProductStocks > 0 ? "Available" : "Unavailable"}
          </span>
        </div>
        <span className="dashboardSpan">{ProductStocks} stocks remaining</span>
      </div>
    </div>
  );
}
