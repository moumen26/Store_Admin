import React, { useRef, useState } from "react";
import Header from "../components/Header";
import ButtonAdd from "../components/ButtonAdd";
import Search from "../components/Search";
import ProductsContainer from "../components/ProductsContainer";
import Modal from "react-modal";
import CircularProgress from "@mui/material/CircularProgress";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";

// Set the app element for accessibility
Modal.setAppElement("#root");

export default function Products() {
  const { user } = useAuthContext();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [Category, setCategory] = useState("");
  const handelCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const [Brand, setBrand] = useState("");
  const handelBrandChange = (e) => {
    setBrand(e.target.value);
  };
  //product form
  const [productName, setProductName] = useState("");
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const [productSize, setProductSize] = useState("");
  const handleProductSizeChange = (e) => {
    setProductSize(e.target.value);
  };
  const [productBoxItems, setProductBoxItems] = useState("");
  const handleProductBoxItemsChange = (e) => {
    setProductBoxItems(e.target.value);
  };
  const [productBrand, setProductBrand] = useState("");
  const handleProductBrandChange = (e) => {
    setProductBrand(e.target.value);
  };
  const [productCategory, setProductCategory] = useState("");
  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleOpenAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleCloseAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const handleOpenAddBrandModal = () => {
    setIsAddBrandModalOpen(true);
  };

  const handleCloseAddBrandModal = () => {
    setIsAddBrandModalOpen(false);
  };

  const [
    AddNewCategoryConfirmationDialog,
    setAddNewCategoryConfirmationDialog,
  ] = useState(false);
  const handleOpenAddNewCategoryConfirmationDialog = () => {
    setAddNewCategoryConfirmationDialog(true);
  };
  const [AddNewBrandConfirmationDialog, setAddNewBrandConfirmationDialog] =
    useState(false);
  const handleOpenAddNewBrandConfirmationDialog = () => {
    setAddNewBrandConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setAddNewCategoryConfirmationDialog(false);
    setAddNewBrandConfirmationDialog(false);
  };
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  // fetching Product data
  const fetchProductData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    // Handle the error state
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return [];
      else throw new Error("Error receiving Product data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: ProductData,
    error: ProductError,
    isLoading: ProductLoading,
    refetch: ProductRefetch,
  } = useQuery({
    queryKey: ["ProductData", user?.token, location.key],
    queryFn: fetchProductData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  // fetching Brand data
  const fetchBrandData = async () => {
    const response = await fetch(import.meta.env.VITE_APP_URL_BASE + `/Brand`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    // Handle the error state
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return [];
      else throw new Error("Error receiving Brand data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: BrandData,
    error: BrandError,
    isLoading: BrandLoading,
    refetch: BrandRefetch,
  } = useQuery({
    queryKey: ["BrandData", user?.token, location.key],
    queryFn: fetchBrandData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  // fetching Category data
  const fetchCategoryData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    // Handle the error state
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode == 404) return [];
      else throw new Error("Error receiving Category data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: CategoryData,
    error: CategoryError,
    isLoading: CategoryLoading,
    refetch: CategoryRefetch,
  } = useQuery({
    queryKey: ["CategoryData", user?.token, location.key],
    queryFn: fetchCategoryData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  // Refetch data when user changes
  const handleRefetchDataChange = () => {
    ProductRefetch();
    CategoryRefetch();
    BrandRefetch();
  };

  const clearForm = () => {
    setProductName("");
    setProductSize("");
    setProductBoxItems("");
    setProductBrand("");
    setProductCategory("");
    setImage(null);
  };
  //save product API
  const handleSavePRODUCT = async () => {
    try {
      setSubmitionLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("Name", productName);
      formData.append("Category", productCategory);
      formData.append("Size", productSize);
      formData.append("Brand", productBrand);
      formData.append("BoxItems", productBoxItems);

      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/Product/create`,
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
        handleRefetchDataChange();
        setSubmitionLoading(false);
        handleCloseAddProductModal();
        clearForm();
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
        console.error("Error creating product: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating product");
      }
    }
  };

  const [CategoryName, setCategoryName] = useState("");
  const handleConfirmAddNewCategory = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/Category/create`,
        {
          Name: CategoryName,
        },
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
        CategoryRefetch();
        setSubmitionLoading(false);
        handleCloseConfirmationDialog();
        setCategoryName("");
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
        console.error("Error creating category: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating category", error);
      }
    }
  };
  const [BrandName, setBrandName] = useState("");
  const [BrandCode, setBrandCode] = useState("");
  const handleConfirmAddNewBrand = async () => {
    try {
      setSubmitionLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_APP_URL_BASE + `/Brand/create`,
        {
          Name: BrandName,
          Image: "asdasdsa.jpeg",
          Code: BrandCode,
        },
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
        BrandRefetch();
        setSubmitionLoading(false);
        handleCloseConfirmationDialog();
        setBrandName("");
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
        console.error("Error creating brand: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating brand");
      }
    }
  };

  return (
    <div className="pagesContainer">
      <Header />
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Products Grid</h2>
        <div className="flex space-x-4">
          <ButtonAdd
            buttonSpan="Add New Category"
            setOnClick={handleOpenAddCategoryModal}
          />
          <ButtonAdd
            buttonSpan="Add New Brand"
            setOnClick={handleOpenAddBrandModal}
          />
          <ButtonAdd
            buttonSpan="Add New Product"
            setOnClick={handleOpenAddProductModal}
          />
        </div>
      </div>
      <div className="pageTable">
        <div className="addProductModalHeader">
          <Search
            placeholder="Search by Product..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-5 items-center">
            <span>Brand :</span>
            <div className="selectStoreWilayaCommune w-[300px]">
              <select name="productCategory" onChange={handelBrandChange}>
                <option value="">-- Select Product Brand --</option>
                {BrandData?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <span>Category :</span>
            <div className="selectStoreWilayaCommune w-[300px]">
              <select name="productCategory" onChange={handelCategoryChange}>
                <option value="">-- Select Product Category --</option>
                {CategoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="pageTableContainer">
          <ProductsContainer
            searchQuery={searchQuery}
            onProductClick={handleSelectProduct}
            data={ProductData}
            ProductRefetch={ProductRefetch}
            selectedCategory={Category}
            CategoryData={CategoryData}
            selectedBrand={Brand}
            BrandData={BrandData}
          />
        </div>
      </div>
      {/* New Modal for Adding Product */}
      <Modal
        isOpen={isAddProductModalOpen}
        onRequestClose={handleCloseAddProductModal}
        contentLabel="Add New Product"
        className="addNewModal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        {!submitionLoading || BrandLoading || CategoryLoading ? (
          <div className="customerClass pb-0">
            <h2 className="dialogTitle">Add New Product to Stock</h2>
            <div className="mt-[16px]">
              <form>
                <div className="flex-col space-y-8">
                  <div className="dialogAddCustomerItem items-center">
                    <span>Product Name :</span>
                    <div className="inputForm">
                      <input
                        type="text"
                        name="productName"
                        onChange={handleProductNameChange}
                      />
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>Product Size :</span>
                    <div className="inputForm">
                      <input
                        type="text"
                        name="productName"
                        onChange={handleProductSizeChange}
                      />
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>BoxItems :</span>
                    <div className="inputForm">
                      <input
                        type="number"
                        name="productName"
                        onChange={handleProductBoxItemsChange}
                      />
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>Product Category :</span>
                    <div className="selectStoreWilayaCommune w-[500px]">
                      <select
                        name="productCategory"
                        onChange={handleProductCategoryChange}
                      >
                        <option value="">-- Select Product Category --</option>
                        {CategoryData?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>Product Brand :</span>
                    <div className="selectStoreWilayaCommune w-[500px]">
                      <select
                        name="productCategory"
                        onChange={handleProductBrandChange}
                      >
                        <option value="">-- Select Product Brand --</option>
                        {BrandData?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>Product Picture :</span>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-[80px] h-[80px] bg-slate-200 rounded-full cursor-pointer flex items-center justify-center relative overflow-hidden"
                        onClick={handleClick}
                      >
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <PhotoIcon className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="h-[80px] w-[404px] flex items-center justify-center uploadClass">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <p onClick={handleClick} className="uploadSpan">
                          <span className="text-blue-600">
                            Click to upload{" "}
                          </span>
                          or drag and drop SVG, PNG, JPG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-8 mt-[20px]">
                  <button
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseAddProductModal}
                  >
                    Cancel
                  </button>
                  <input
                    type="button"
                    value={"Save"}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={handleSavePRODUCT}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </Modal>

      {/* New Modal for Adding Brand */}
      <Modal
        isOpen={isAddBrandModalOpen}
        onRequestClose={handleCloseAddBrandModal}
        contentLabel="Add New Brand"
        className="addNewModal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        {!submitionLoading || BrandLoading || CategoryLoading ? (
          <div className="customerClass p-0">
            <h2 className="dialogTitle">Add New Brand to Stock</h2>
            <div className="mt-[16px]">
              <form>
                <div className="flex-col space-y-8">
                  <div className="dialogAddCustomerItem items-center">
                    <span>Code :</span>
                    <div className="inputForm">
                      <input
                        type="text"
                        name="BrandCode"
                        onChange={(e) => setBrandCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="dialogAddCustomerItem items-center">
                    <span>Brand :</span>
                    <div className="inputForm">
                      <input
                        type="text"
                        name="BrandName"
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-8 mt-[20px]">
                  <button
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleCloseAddBrandModal}
                  >
                    Cancel
                  </button>
                  <input
                    type="button"
                    value={"Save"}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={handleOpenAddNewBrandConfirmationDialog}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </Modal>

      {/* New Modal for Adding Category */}
      <Modal
        isOpen={isAddCategoryModalOpen}
        onRequestClose={handleCloseAddCategoryModal}
        contentLabel="Add New Category"
        className="addNewModal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        {!submitionLoading || BrandLoading || CategoryLoading ? (
          <div className="customerClass p-0">
            <h2 className="dialogTitle">Add New Category to Stock</h2>
            <div className="flex-col items-center w-full space-y-8 mt-[16px] p-0">
              <div className="dialogAddCustomerItem items-center">
                <span>Category :</span>
                <div className="inputForm">
                  <input
                    type="text"
                    name="CategoryName"
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-8 mt-[20px]">
              <button
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleCloseAddCategoryModal}
              >
                Cancel
              </button>
              <input
                type="button"
                value={"Save"}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={handleOpenAddNewCategoryConfirmationDialog}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={AddNewCategoryConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmAddNewCategory}
        dialogTitle={"Confirm category creation"}
        dialogContentText={`Are you sure you want to create new category ?`}
        isloading={submitionLoading}
      />

      <ConfirmDialog
        open={AddNewBrandConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmAddNewBrand}
        dialogTitle={"Confirm brand creation"}
        dialogContentText={`Are you sure you want to create new brand ?`}
        isloading={submitionLoading}
      />

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
    </div>
  );
}
