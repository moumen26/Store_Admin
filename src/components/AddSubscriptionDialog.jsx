import * as React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

function AddSubscriptionDialog({
  open,
  onClose,
  onConfirm,
  dialogTitle,
  dialogContentText,
  isloading = false,
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  const [subscriptionId, setSubscriptionId] = React.useState("");
  const handelSubscriptionChange = (e) => {
    setSubscriptionId(e.target.value);
  };
  const [expiryMonths, setExpiryMonths] = React.useState(0);
  const handelExpiryMonthsChange = (e) => {
    setExpiryMonths(e.target.value);
  };

  // fetching Subscriptions data
  const fetchSubscriptionsData = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_URL_BASE + `/Subscription`,
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
      else throw new Error("Error receiving Subscriptions data");
    }
    // Return the data
    return await response.json();
  };
  // useQuery hook to fetch data
  const {
    data: SubscriptionsData,
    error: SubscriptionsError,
    isLoading: SubscriptionsLoading,
    refetch: SubscriptionsRefetch,
  } = useQuery({
    queryKey: ["SubscriptionsData", user?.token, location.key],
    queryFn: fetchSubscriptionsData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: true, // Optional: prevent refetching on window focus
  });

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Add New Subscriptions"
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
          overflowY: "auto",
        },
      }}
    >
      {!isloading ? (
        <div className="customerClass pb-0">
          <h2 className="dialogTitle">{dialogTitle}</h2>
          <div className="mt-[16px]">
            <div className="flex-col space-y-8">
              <div className="dialogAddCustomerItem items-center">
                <span>Subscription:</span>
                <div className="selectStoreWilayaCommune w-[500px]">
                  <select
                    name="productCategory"
                    onChange={handelSubscriptionChange}
                  >
                    <option value="">-- Select a subscription --</option>
                    {SubscriptionsData?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="dialogAddCustomerItem items-center">
                <span>Expiry Months:</span>
                <div className="inputForm">
                  <input
                    type="text"
                    name="expiryMonths"
                    value={expiryMonths}
                    onChange={handelExpiryMonthsChange}
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[20px]">
              <span className="trTableSpan">{dialogContentText}</span>
            </div>
          </div>
          <div className="flex justify-end space-x-8 mt-[20px]">
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(subscriptionId, expiryMonths)}
              className="text-blue-500 cursor-pointer hover:text-bluz-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="customerClassTitle">{dialogTitle}</h2>
          <span className="trTableSpan">{dialogContentText}</span>
          <div className="flex justify-end space-x-8 pr-8 items-start h-[60px] mt-2">
            <CircularProgress />
          </div>
        </>
      )}
    </Modal>
  );
}

AddSubscriptionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddSubscriptionDialog;
