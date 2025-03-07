import {
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowTrendingDownIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  UsersIcon,
  UserGroupIcon,
  UserPlusIcon,
  DevicePhoneMobileIcon,
  Square2StackIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function Asidebar() {
  const location = useLocation();

  const { logout } = useLogout();

  const submitLogout = () => {
    logout();
  };

  const [isShopsOpen, setisShopsOpen] = useState(false);
  const [isStoresOpen, setisStoresOpen] = useState(false);

  const handleShopsClick = () => {
    setisShopsOpen((prevState) => !prevState);
  };

  const handleStoresClick = () => {
    setisStoresOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".sidebar")) {
      setisShopsOpen(false);
      setisStoresOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="aside">
      <ul className="topAsideBar flex-col space-y-[8px]">
        <li>
          <NavLink to="/" className="flex items-center">
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/" ? "asideItemActive" : ""
              }`}
            >
              <Squares2X2Icon className="iconAsideBar" />
              <span className="ml-3">Dashboard</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Products" className="flex items-center">
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/Products" ? "asideItemActive" : ""
              }`}
            >
              <ArchiveBoxIcon className="iconAsideBar" />
              <span className="ml-3">Products</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Authentication" className=" flex items-center">
            <div
              className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                location.pathname === "/Authentication" ? "asideItemActive" : ""
              }`}
            >
              <UserPlusIcon className="iconAsideBar" />
              <span className="ml-3">User Authentication</span>
            </div>
          </NavLink>
        </li>
        <div className="flex-col space-y-[8px] sidebar">
          <li className="flex-col space-y-[8px]">
            <div className="flex items-center cursor-pointer">
              <div
                className={`flex items-center justify-between itemAsideBar`}
                onClick={handleStoresClick}
              >
                <div className="flex">
                  <BuildingStorefrontIcon className="iconAsideBar" />
                  <span className="ml-3">Stores</span>
                </div>
                <ChevronDownIcon
                  className={`iconPages ${isStoresOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
            {isStoresOpen && (
              <div className="flex-col space-y-[8px]">
                <NavLink to="/Customer/Requests" className=" flex items-center">
                  <div
                    className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                      location.pathname === "/Customer/Requests"
                        ? "asideItemActive"
                        : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">Store requests</span>
                  </div>
                </NavLink>
                <NavLink to="/Customers" className=" flex items-center">
                  <div
                    className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                      location.pathname === "/Customers"
                        ? "asideItemActive"
                        : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">Active stores</span>
                  </div>
                </NavLink>
                <NavLink to="/InactiveStore" className="flex items-center">
                  <div
                    className={`flex items-center itemAsideBar ${
                      location.pathname === "/InactiveStore"
                        ? "asideItemActive"
                        : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">Inactive stores</span>
                  </div>
                </NavLink>
              </div>
            )}
          </li>
        </div>
        <div className="flex-col space-y-[8px] sidebar">
          <li className="flex-col space-y-[8px]">
            <div className="flex items-center cursor-pointer">
              <div
                className={`flex items-center justify-between itemAsideBar`}
                onClick={handleShopsClick}
              >
                <div className="flex">
                  <UsersIcon className="iconAsideBar" />
                  <span className="ml-3">Shops</span>
                </div>
                <ChevronDownIcon
                  className={`iconPages ${isShopsOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
            {isShopsOpen && (
              <div className="flex-col space-y-[8px]">
                <NavLink to="/Shops" className=" flex items-center">
                  <div
                    className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                      location.pathname === "/Shops" ? "asideItemActive" : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">All Shops</span>
                  </div>
                </NavLink>
                <NavLink to="/BlockedShops" className="flex items-center">
                  <div
                    className={`flex items-center itemAsideBar ${
                      location.pathname === "/BlockedShops"
                        ? "asideItemActive"
                        : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">Blocked Shops</span>
                  </div>
                </NavLink>
                <NavLink to="/VerifiedShops" className="flex items-center">
                  <div
                    className={`flex items-center itemAsideBar ${
                      location.pathname === "/VerifiedShops"
                        ? "asideItemActive"
                        : ""
                    }`}
                  >
                    <Square2StackIcon className="iconAsideBar opacity-0" />
                    <span className="ml-3">Verified Shops</span>
                  </div>
                </NavLink>
              </div>
            )}
          </li>
        </div>
        <li>
          <NavLink to="/Losses" className=" flex items-center">
            <div
              className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                location.pathname === "/Losses" ? "asideItemActive" : ""
              }`}
            >
              <ArrowTrendingDownIcon className="iconAsideBar" />
              <span className="ml-3">Losses</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Publicite" className=" flex items-center">
            <div
              className={`flex items-center itemAsideBar AuthenticationItemAsideBar  ${
                location.pathname === "/Publicite" ? "asideItemActive" : ""
              }`}
            >
              <DevicePhoneMobileIcon className="iconAsideBar" />
              <span className="ml-3">Publicité</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Settings" className=" flex items-center">
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/Settings" ? "asideItemActive" : ""
              }`}
            >
              <Cog6ToothIcon className="iconAsideBar" />
              <span className="ml-3">Settings</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SignIn"
            className=" flex items-center"
            onClick={submitLogout}
          >
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/SignIn" ? "asideItemActive" : ""
              }`}
            >
              <ArrowLeftStartOnRectangleIcon className="iconAsideBar" />
              <span className="ml-3">Log out</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
