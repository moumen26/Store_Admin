import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ButtonExportExcel from "../components/ButtonExportExcel";
import DashboardCalendar from "../components/DashboardCalendar";
import OrderCard from "../components/OrderCard";
import LossesTable from "../components/LossesTable";
import ButtonAdd from "../components/ButtonAdd";
import Modal from "react-modal";
import PublicitéTable from "../components/PublicitéTable";
import PubSwiper from "../components/PubSwiper";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function Publicité() {
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

  const [openModelAddPub, setOpenModelAddPub] = useState(false);

  const handleOpenModalAddPub = () => {
    setOpenModelAddPub(true);
  };

  const handleCloseModalAddLoss = () => {
    setOpenModelAddPub(false);
  };

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); // Store the preview URL of the image
    }
  };

  const openFileInput = () => {
    document.getElementById("imageUploadInput").click(); // Trigger the file input dialog
  };

  return (
    <div className="pagesContainer pubContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Publicité</h2>
        <ButtonAdd
          buttonSpan="Add a Publicité"
          onClick={handleOpenModalAddPub}
        />
      </div>

      <PubSwiper />

      <div className="pageTable ordersTable">
        <div className="w-full flex items-center justify-between">
          <Search
            placeholder="Search by Publicité..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-2">
            <ButtonExportExcel data={filteredData} filename="Publicité" />
            <Modal
              isOpen={openModelAddPub}
              onRequestClose={handleCloseModalAddLoss}
              contentLabel="Add new Publicité"
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
                <h2 className="customerClassTitle">Add New Publicité</h2>

                {/* Image Upload Section */}
                <div className="mt-[20px]">
                  <div
                    className="w-full h-[300px] flex justify-center items-center border-dashed border-[2px] border-gray-400 cursor-pointer"
                    onClick={openFileInput}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <p className="uploadSpan">
                        <span className="text-blue-600">Click to upload </span>
                        or drag and drop SVG, PNG, JPG
                      </p>
                    )}

                    <input
                      id="imageUploadInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end space-x-8 items-start mt-[20px]">
                  <button
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseModalAddLoss}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    // Add your logic to handle saving the image or data here
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="pageTableContainer">
          <PublicitéTable
            searchQuery={searchQuery}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
}
