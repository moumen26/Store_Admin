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

// Set the app element for accessibility
Modal.setAppElement("#root"); // or the ID of your root element

export default function ProductsContainer({
  searchQuery,
  onSelectProduct,
  data,
  selectedCategory,
  selectedBrand,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState(false);
  const [ConfirmModalProduct, setConfirmModalProduct] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false); // State for image removal
  const [uploadedImage, setUploadedImage] = useState(null); // State for the uploaded image
  const [editFields, setEditFields] = useState({
    name: "",
    brand: "",
    boxItems: "",
    size: "",
    category: "",
  });

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditFields({
      name: product.name,
      code: product.code,
      brand: product.brand?.name,
      boxItems: product.boxItems,
      size: product.size,
      category: product.category?.name,
    });
    setIsModalOpen(true);
    setIsImageRemoved(false); // Reset image removal when opening new product
    setUploadedImage(null); // Reset uploaded image
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({
      ...editFields,
      [name]: value,
    });
  };

  const handleImageRemove = () => {
    setIsImageRemoved(true); // Remove image when clicking X
    setUploadedImage(null); // Clear uploaded image if any
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); // Preview the uploaded image
      setIsImageRemoved(false); // Reset image removal when a new image is uploaded
    }
  };

  const openFileInput = () => {
    document.getElementById("imageUploadInput").click(); // Trigger the file input dialog
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
              productImage={`${import.meta.env.VITE_APP_URL_BASE.replace(
                "/api",
                ""
              )}/files/${product.image}`}
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
              height: "fit-content",
            },
          }}
        >
          <div className="w-[100%] h-fit flex-col space-y-[20px] ProductModal">
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
                    src={uploadedImage}
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
                    src={`${import.meta.env.VITE_APP_URL_BASE.replace(
                      "/api",
                      ""
                    )}/files/${selectedProduct.image}`}
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
                  src={`${import.meta.env.VITE_APP_URL_BASE.replace(
                    "/api",
                    ""
                  )}/files/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            )}

            <div className="flex-col space-y-3">
              <div className="flex space-x-3">
                <span className="thTableSpan">Product Code</span>
                <span className="trTableSpan">{selectedProduct.code}</span>
              </div>
              <div className="flex space-x-3 items-center">
                <span className="thTableSpan">Name</span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="name"
                      value={editFields.name}
                      onChange={handleInputChange}
                      className="inputField"
                    />
                  </div>
                ) : (
                  <span className="trTableSpan">
                    {selectedProduct.name} {selectedProduct.size}
                  </span>
                )}
              </div>
              {isEditing ? (
                <div className="flex space-x-3 items-center">
                  <span className="thTableSpan">Size</span>
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="size"
                      value={editFields.size}
                      onChange={handleInputChange}
                      className="inputField"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              {isEditing ? (
                <div className="flex space-x-3 items-center">
                  <span className="thTableSpan">Category</span>
                  <div className="inputForm flex items-center">
                    <select
                      name="category"
                      onChange={handleInputChange}
                      className="inputField"
                    >
                      <option value="">-- Select Product Category --</option>
                    </select>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex space-x-3 items-center">
                <span className="thTableSpan">Brand</span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <select
                      name="brand"
                      onChange={handleInputChange}
                      className="inputField"
                    >
                      <option value="">-- Select Product Brand --</option>
                    </select>
                  </div>
                ) : (
                  <span className="trTableSpan">
                    {selectedProduct.brand.name}
                  </span>
                )}
              </div>
              <div className="flex space-x-3 items-center">
                <span className="thTableSpan">Box Items</span>
                {isEditing ? (
                  <div className="inputForm flex items-center">
                    <input
                      type="text"
                      name="boxItems"
                      value={editFields.boxItems}
                      onChange={handleInputChange}
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
      <ConfirmDialog
        open={DeleteProduct}
        onClose={handleCloseDeleteProduct}
        dialogTitle={"Confirm Product Deletion"}
        dialogContentText={`Are you sure you want to delete this product?`}
      />
      <ConfirmDialog
        open={ConfirmModalProduct}
        onClose={handleCloseConfirmModalProduct}
        dialogTitle={"Confirm Product Modification"}
        dialogContentText={`Are you sure you want to save the changes made to this product? `}
      />
    </div>
  );
}
