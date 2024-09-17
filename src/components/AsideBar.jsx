import {
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowTrendingDownIcon,
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  Square2StackIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { useLogout } from "../hooks/useLogout";

export default function Asidebar() {
  const location = useLocation();

  // const { logout } = useLogout();

  // const submitLogout = () => {
  //   logout();
  // };

  return (
    <aside>
      <ul className="topAsideBar flex-col space-y-[8px]">
        <li>
          <NavLink to="/Dashboard" className="flex items-center">
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/Dashboard" ? "asideItemActive" : ""
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
          <NavLink to="/Customers" className=" flex items-center">
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/Customers" ? "asideItemActive" : ""
              }`}
            >
              <UserGroupIcon className="iconAsideBar" />
              <span className="ml-3">Customers</span>
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
            to="/SignUp"
            className=" flex items-center"
            // onClick={submitLogout}
          >
            <div
              className={`flex items-center itemAsideBar ${
                location.pathname === "/SignUp" ? "asideItemActive" : ""
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
