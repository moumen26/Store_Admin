import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root"); // or the ID of your root element

export default function ProductsContainer({
  searchQuery,
  onSelectProduct,
  data,
  selectedCategory,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    onSelectProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
                product.category?._id == selectedCategory)
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
          <div className="w-[100%] h-fit flex-col space-y-[20px]">
            <h2 className="customerClassTitle">Product Details</h2>
            <div className="w-full flex justify-center h-[300px]">
              <img
                className="text-center"
                srcSet={`${import.meta.env.VITE_APP_URL_BASE.replace(
                  "/api",
                  ""
                )}/files/${selectedProduct.image}`}
                src={`${import.meta.env.VITE_APP_URL_BASE.replace(
                  "/api",
                  ""
                )}/files/${selectedProduct.image}`}
                alt={selectedProduct.name}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
            <div className="flex-col space-y-3">
              <div className="flex space-x-3">
                <span className="thTableSpan">Product Code</span>
                <span className="trTableSpan">{selectedProduct.code}</span>
              </div>
              <div className="flex space-x-3">
                <span className="thTableSpan">Name</span>
                <span className="trTableSpan">
                  {selectedProduct.name} {selectedProduct.size}
                </span>
              </div>
              <div className="flex space-x-3">
                <span className="thTableSpan">Brand</span>
                <span className="trTableSpan">
                  {selectedProduct.brand.name}
                </span>
              </div>
              <div className="flex space-x-3">
                <span className="thTableSpan">Box Items</span>
                <span className="trTableSpan">{selectedProduct.boxItems}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
              style={{ marginTop: "20px" }}
              className="text-gray-500 cursor-pointer hover:text-gray-700 mt-[20px]"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
