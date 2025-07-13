import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Modal from "react-modal";
import {
  CheckIcon,
  PencilIcon,
  PhotoIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert, Snackbar } from "@mui/material";

// Set the app element for accessibility
Modal.setAppElement("#root"); // or the ID of your root element

export default function ProductsContainer({
  searchQuery,
  onSelectProduct,
  data,
  CategoryData,
  selectedCategory,
  BrandData,
  selectedBrand,
  ProductRefetch,
}) {
  const { user } = useAuthContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState(false);
  const [ConfirmModalProduct, setConfirmModalProduct] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Name, setName] = useState("");
  const [Size, setSize] = useState("");
  const [Category, setCategory] = useState("");
  const [Brand, setBrand] = useState("");
  const [BoxItems, setBoxItems] = useState("");

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };
  const handleSizeInputChange = (e) => {
    setSize(e.target.value);
  };
  const handleBoxItemsInputChange = (e) => {
    setBoxItems(e.target.value);
  };
  const handleCategoryInputChange = (e) => {
    setCategory(e.target.value);
  };
  const handleBrandInputChange = (e) => {
    setBrand(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsImageRemoved(false);
    setUploadedImage(null);
    onSelectProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleCloseUpdate = () => {
    setIsEditing(false);
  };

  const handleOpenDeleteProduct = () => {
    setDeleteProduct(true);
  };
  const handleCloseDeleteProduct = () => {
    setDeleteProduct(false);
  };

  const handleConfirmModalProduct = () => {
    setConfirmModalProduct(true);
  };
  const handleCloseConfirmModalProduct = () => {
    setConfirmModalProduct(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageRemove = () => {
    setIsImageRemoved(true);
    setUploadedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      setIsImageRemoved(false);
    }
  };

  const openFileInput = () => {
    document.getElementById("imageUploadInput").click();
  };

  const clearUpdatedForm = () => {
    setName("");
    setSize("");
    setCategory("");
    setBrand("");
    setBoxItems("");
    setUploadedImage(null);
  };

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDeleteProduct = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.delete(
        import.meta.env.VITE_APP_URL_BASE + `/Product/${selectedProduct._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        ProductRefetch();
        setSubmitionLoading(false);
        handleCloseDeleteProduct();
        handleCloseModal();
      } else {
        setAlertType(true);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setAlertType(true);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error deleting Product: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error deleting Product");
      }
    }
  };

  const handleUpdateProduct = async () => {
    try {
      setSubmitionLoading(true);
      const formData = new FormData();
      formData.append("file", uploadedImage);
      formData.append("Name", Name);
      formData.append("Category", Category);
      formData.append("Size", Size);
      formData.append("Brand", Brand);
      formData.append("BoxItems", BoxItems);

      const response = await axios.patch(
        `${import.meta.env.VITE_APP_URL_BASE}/Product/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertType(false);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        ProductRefetch();
        setSubmitionLoading(false);
        handleCloseConfirmModalProduct();
        handleCloseModal();
        clearUpdatedForm();
      } else {
        setAlertType(true);
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setAlertType(true);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setSubmitionLoading(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error updating Product: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error updating Product");
      }
    }
  };

  return (
    <div className="productsContainer">
      {data?.length > 0 ? (
        data
          ?.filter(
            (product) =>
              (product.code
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                product.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                product.brand?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                product.category?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())) &&
              (selectedCategory == "" ||
                product.category?._id == selectedCategory) &&
              (selectedBrand == "" || product.brand?._id == selectedBrand)
          )
          .map((product) => (
            <ProductCard
              key={product._id}
              productName={
                product.brand?.name + " " + product.name + " " + product.size
              }
              productImage={`${import.meta.env.VITE_APP_FILES_URL}/${product.image}`}
              onClick={() => handleSelectProduct(product)}
              selected={selectedProduct && product._id === selectedProduct._id}
            />
          ))
      ) : (
        <p>No products available</p>
      )}

      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Product Details"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "30%",
              margin: "auto",
              zIndex: 1001,
              // height: "fit-content",
            },
          }}
        >
          <div
            className={`w-[100%] flex-col space-y-[20px] h-fit ${
              isEditing ? "h-[100%] pb-4" : "h-fit"
            }`}
          >
            <div className="flex justify-between">
              <h2 className="customerClassTitle">Product Details</h2>
              {isEditing ? (
                <div className="flex space-x-4 items-center">
                  <XMarkIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseUpdate}
                  />
                  <CheckIcon
                    className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-700"
                    onClick={handleConfirmModalProduct}
                  />
                </div>
              ) : (
                <div className="flex space-x-4 items-center">
                  <PencilIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleEditToggle}
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={handleOpenDeleteProduct}
                  />
                </div>
              )}
            </div>
            {isEditing ? (
              isImageRemoved || !selectedProduct.image ? (
                <div
                  className="w-full h-[300px] flex justify-center items-center border-dashed border-[2px] border-gray-400 cursor-pointer"
                  onClick={openFileInput}
                >
                  <p className="uploadSpan">
                    <span className="text-blue-600">Click to upload </span>
                    or drag and drop SVG, PNG, JPG
                  </p>

                  <input
                    id="imageUploadInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
              ) : uploadedImage ? (
                <div className="w-full flex justify-center h-[300px] relative">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded Product"
                    style={{ width: "auto", height: "100%" }}
                  />
                  <XMarkIcon
                    className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700 absolute left-0 top-0"
                    onClick={handleImageRemove}
                  />
                </div>
              ) : (
                <div className="w-full flex justify-center h-[300px] relative">
                  <img
                    src={`${import.meta.env.VITE_APP_FILES_URL}/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    style={{ width: "auto", height: "100%" }}
                  />
                  <XMarkIcon
                    className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700 absolute left-0 top-0"
                    onClick={handleImageRemove}
                  />
                </div>
              )
            ) : (
              <div className="w-full flex justify-center h-[300px]">
                <img
                  className="text-center"
                  src={`${import.meta.env.VITE_APP_FILES_URL}/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            )}

            <div className="flex-col space-y-3">
              <div className="flex space-x-3">
                <span className="thTableSpan w-fit">Product Code :</span>
                <span className="trTableSpan">{selectedProduct.code}</span>
              </div>
              <div className="flex space-x-3 items-center">
                <span
                  className={`thTableSpan ${isEditing ? "w-[150px]" : "w-fit"}`}
                >
                  Name :
                </span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="name"
                      value={Name}
                      onChange={handleNameInputChange}
                      className="inputField"
                    />
                  </div>
                ) : (
                  <span className="trTableSpan w-fit">
                    {selectedProduct.name} {selectedProduct.size}
                  </span>
                )}
              </div>

              {isEditing ? (
                <div className="flex space-x-3 items-center">
                  <span
                    className={`thTableSpan ${
                      isEditing ? "w-[150px]" : "w-fit"
                    }`}
                  >
                    Size :
                  </span>
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="size"
                      value={Size}
                      onChange={handleSizeInputChange}
                      className="inputField"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex space-x-3 items-center">
                <span
                  className={`thTableSpan ${isEditing ? "w-[150px]" : "w-fit"}`}
                >
                  Category :
                </span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <select
                      name="category"
                      onChange={handleCategoryInputChange}
                      className="inputField"
                    >
                      <option value="">-- Select Product Category --</option>
                      {CategoryData?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <span className="trTableSpan">
                    {selectedProduct.category.name}
                  </span>
                )}
              </div>
              <div className="flex space-x-3 items-center">
                <span
                  className={`thTableSpan ${isEditing ? "w-[150px]" : "w-fit"}`}
                >
                  Brand :
                </span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <select
                      name="brand"
                      onChange={handleBrandInputChange}
                      className="inputField"
                    >
                      <option value="">-- Select Product Brand --</option>
                      {BrandData?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <span className="trTableSpan">
                    {selectedProduct.brand.name}
                  </span>
                )}
              </div>
              <div className="flex space-x-3 items-center">
                <span
                  className={`thTableSpan ${isEditing ? "w-[150px]" : "w-fit"}`}
                >
                  Box Items :
                </span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="boxItems"
                      value={BoxItems}
                      onChange={handleBoxItemsInputChange}
                      className="inputField"
                    />
                  </div>
                ) : (
                  <span className="trTableSpan">
                    {selectedProduct.boxItems}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="h-[10px]"></div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                style={{ marginTop: "20px" }}
                className="text-gray-500 cursor-pointer hover:text-gray-700 mt-[20px]"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      )}
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={DeleteProduct}
        onClose={handleCloseDeleteProduct}
        onConfirm={handleDeleteProduct}
        dialogTitle={"Confirm Product Deletion"}
        dialogContentText={`Are you sure you want to delete this product?`}
        isloading={submitionLoading}
      />
      <ConfirmDialog
        open={ConfirmModalProduct}
        onClose={handleCloseConfirmModalProduct}
        onConfirm={handleUpdateProduct}
        dialogTitle={"Confirm Product Modification"}
        dialogContentText={`Are you sure you want to save the changes made to this product? `}
        isloading={submitionLoading}
      />
    </div>
  );
}
