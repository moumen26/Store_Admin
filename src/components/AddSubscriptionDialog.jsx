import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function AddSubscriptionDialog({
  open,
  onClose,
  onConfirm,
  dialogTitle,
  dialogContentText,
  isloading = false
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
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        {!isloading ?
            <>
            <DialogTitle id="alert-dialog-title">
                <h2 className="customerClassTitle">{dialogTitle}</h2>
            </DialogTitle>
            <DialogContent>
                <div className="flex space-x-5 items-center">
                    <span>Subscription:</span>
                    <div className="selectStoreWilayaCommune w-[300px]">
                        <select name="productCategory" onChange={handelSubscriptionChange}>
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
                <DialogContentText id="alert-dialog-description">
                    <span className="trTableSpan">{dialogContentText}</span>
                </DialogContentText>
            </DialogContent>
            <div className="flex justify-end space-x-8 pr-8 items-start h-[40px] mt-2">
                <button
                onClick={onClose}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                >
                Cancel
                </button>
                <button
                onClick={() => onConfirm(subscriptionId, expiryMonths)}
                className="text-red-500 cursor-pointer hover:text-red-700"
                >
                Confirm
                </button>
            </div>
            </>
            :
            <>
                <DialogTitle id="alert-dialog-title">
                <h2 className="customerClassTitle">{dialogTitle}</h2>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <span className="trTableSpan">{dialogContentText}</span>
                </DialogContentText>
                </DialogContent>
                <div className="flex justify-end space-x-8 pr-8 items-start h-[60px] mt-2">
                <CircularProgress />
                </div>
            </>
        }
        </Dialog>
    );
}

AddSubscriptionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddSubscriptionDialog;
