import React from "react";
import DashboardTopSellingProductItem from "./DashboardTopSellingProductItem";

import ProductImg from "../assets/images/Elio.png";

const productData = [
  {
    ProductImage: ProductImg,
    ProductName: "Product 1",
    ProductSales: 100,
    ProductStocks: 50,
  },
  {
    ProductImage: ProductImg,
    ProductName: "Product 2",
    ProductSales: 200,
    ProductStocks: 0,
  },
  {
    ProductImage: ProductImg,
    ProductName: "Product 3",
    ProductSales: 150,
    ProductStocks: 20,
  },
  {
    ProductImage: ProductImg,
    ProductName: "Product 4",
    ProductSales: 250,
    ProductStocks: 0,
  },
  {
    ProductImage: ProductImg,
    ProductName: "Product 5",
    ProductSales: 250,
    ProductStocks: 0,
  },
  {
    ProductImage: ProductImg,
    ProductName: "Product 6",
    ProductSales: 250,
    ProductStocks: 0,
  },
];

export default function DashboardTopSellingProduct() {
  return (
    <div className="dashboardTopSellingProduct">
      <div className="w-full flex items-center justify-between">
        <h3 className="dashboardTitleItem">Top Selling Product</h3>
        <span className="seeSpan">See All Product</span>
      </div>
      <div className="dashboardProductClass">
        {productData.map((product, index) => (
          <DashboardTopSellingProductItem
            key={index}
            ProductImage={product.ProductImage}
            ProductName={product.ProductName}
            ProductSales={product.ProductSales}
            ProductStocks={product.ProductStocks}
          />
        ))}
      </div>
    </div>
  );
}
