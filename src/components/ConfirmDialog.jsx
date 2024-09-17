import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  dialogTitle,
  dialogContentText,
  isloading = false
}) {
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
              onClick={onConfirm}
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

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDialog;
