import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonExportExcel from "../components/ButtonExportExcel";
import DashboardCalendar from "../components/DashboardCalendar";
import OrderCard from "../components/OrderCard";
import LossesTable from "../components/LossesTable";
import ButtonAdd from "../components/ButtonAdd";
import Modal from "react-modal";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function Losses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // Update dashboard content based on the selected date range
      updateDashboardContent(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange]);

  const updateDashboardContent = (startDate, endDate) => {
    // Logic to update dashboard content based on selected date range
    console.log("Selected range:", startDate, endDate);
    // Fetch or filter data based on date range and update dashboard content
  };

  const [openModelAddLoss, setOpenModelAddLoss] = useState(false);

  const handleOpenModalAddLoss = () => {
    setOpenModelAddLoss(true);
  };

  const handleCloseModalAddLoss = () => {
    setOpenModelAddLoss(false);
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Losses</h2>
        <DashboardCalendar
          onDateChange={(start, end) =>
            setDateRange({ startDate: start, endDate: end })
          }
        />
      </div>
      <div className="flex items-center space-x-6">
        <OrderCard orderCardTitle="Total Losses" orderCardDetails={0} />
      </div>
      <div className="pageTable ordersTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Loss..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-2">
            <ButtonExportExcel data={filteredData} filename="Losses" />
            <ButtonAdd
              buttonSpan="Add a Loss"
              onClick={handleOpenModalAddLoss}
            />
            <Modal
              isOpen={openModelAddLoss}
              onRequestClose={handleCloseModalAddLoss}
              contentLabel="Add Address Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                },
                content: {
                  border: "none",
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "40%",
                  margin: "auto",
                  height: "fit-content",
                  zIndex: 1001,
                },
              }}
            >
              <div className="customerClasss">
                <h2 className="customerClassTitle">Add New Loss</h2>
                <div className="flex-col space-y-4">
                  <div className="flex justify-end items-center space-x-4">
                    <span>Loss :</span>
                    <div className="inputForm pl-0">
                      <input
                        type="text"
                        name="newLoss"
                        // onChange={}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-4">
                    <span>Amount :</span>
                    <div className="inputForm pl-0">
                      <input
                        type="text"
                        name="lossAmount"
                        // onChange={}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-4">
                    <span>Cause :</span>
                    <div className="inputForm pl-0">
                      <input
                        type="text"
                        name="lossCause"
                        // onChange={}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-8 items-start mt-[20px]">
                  <button
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseModalAddLoss}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    // onClick={handleAddItem}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="pageTableContainer">
          <LossesTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
