import {
  BuildingStorefrontIcon,
  CalendarDateRangeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Square2StackIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { Category } from "@mui/icons-material";
import React from "react";

export default function DashboadStoreStatistic({
  StatsData,
  StatsDataLoading,
}) {
  return (
    <div className="dashboadStoreStatistic">
      <div className="w-full flex items-center justify-between">
        <h3 className="dashboardTitleItem">Store Statistics</h3>
      </div>
      <div className="flex-col h-[410px] space-y-6">
        <div className="flex items-center justify-between pl-[20px] pr-[20px]">
          <div className="flex-col space-y-1">
            <h3 clcassName="dashboardText">Total Stores</h3>
            <p className="dashboardSpan">{StatsData?.totalStores}</p>
          </div>
          <div className="flex items-center justify-center">
            <BuildingStorefrontIcon className="iconAsideBar" />
          </div>
        </div>
        <div className="flex items-center justify-between pl-[20px] pr-[20px]">
          <div className="flex-col space-y-1">
            <h3 clcassName="dashboardText">Total Shops</h3>
            <p className="dashboardSpan">{StatsData?.totalClients}</p>
          </div>
          <div className="flex items-center justify-center">
            <UsersIcon className="iconAsideBar" />
          </div>
        </div>
        <div className="flex items-center justify-between pl-[20px] pr-[20px]">
          <div className="flex-col space-y-1">
            <h3 clcassName="dashboardText">Total Products</h3>
            <p className="dashboardSpan">{StatsData?.totalProducts}</p>
          </div>
          <div className="flex items-center justify-center">
            <ShoppingCartIcon className="iconAsideBar" />
          </div>
        </div>
        <div className="flex items-center justify-between pl-[20px] pr-[20px]">
          <div className="flex-col space-y-1">
            <h3 clcassName="dashboardText">Total Brands</h3>
            <p className="dashboardSpan">{StatsData?.totalBrands}</p>
          </div>
          <div className="flex items-center justify-center">
            <ShoppingBagIcon className="iconAsideBar" />
          </div>
        </div>
        <div className="flex items-center justify-between pl-[20px] pr-[20px]">
          <div className="flex-col space-y-1">
            <h3 clcassName="dashboardText">Total Categories</h3>
            <p className="dashboardSpan">{StatsData?.totalCategories}</p>
          </div>
          <div className="flex items-center justify-center">
            <Category className="iconAsideBar" />
          </div>
        </div>
      </div>
    </div>
  );
}
