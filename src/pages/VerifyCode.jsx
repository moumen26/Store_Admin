import React, { useState } from "react";
import ButtonDark from "../components/ButtonDark";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

export default function VerifyCode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [code, setCode] = useState(["", "", "", ""]);
  const handleChange = (value, index) => {
    if (value.match(/^[0-9]$/) || value === "") {
      // Ensure only numeric values are allowed
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically focus the next input if the current one is filled
      if (value !== "" && index < 3) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleViewClick = () => {
    navigate(`/UpYourAccount/${id}`);
  };

  //Verify otp API
  const handleVerifyOTP = async () => {
    try {
        setSubmitionLoading(true);
        const response = await axios.post(import.meta.env.VITE_APP_URL_BASE+`/auth/signup/store/verify`, 
          {
            store: id, 
            otp: code.join(""),
          },
          {
              headers: {
                "Content-Type": "application/json",
              }
          }
        );
        if (response.status === 200) {
          setAlertType(false);
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          setSubmitionLoading(false);
          setCode(["", "", "", ""]);
          handleViewClick();
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
          console.error("Error verifying otp: No response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error verifying otp");
        }
    }
  };

  return (
    <div className="signIn">
      <div className="w-full h-[80px] flex justify-between items-center pl-10 pr-10 border-b-2 border-[#C9E4EE]">
        <h2 className="headerText logoText">Stock</h2>
      </div>
      <div className="signInContainer w-full flex items-center justify-center">
        <div className="signInContainerRightContainer">
          <div>
            <h2 className="titleText text-center">Verify Code</h2>
            <div className="flexCol items-center">
              <span className="text-[#888888]">
                Please enter the code we just sent to number
              </span>
              <span className="text-blue-500 text-center">+213</span>
            </div>
          </div>
          <div className="flex justify-center space-x-8 mt-10">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-16 h-16 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#26667E]"
              />
            ))}
          </div>
          <div className="flexCol">
            <span className="text-[#888888] text-center">
              Didn’t receive OTP?
            </span>
            <a href="" className="text-center">
              Resend code ?
            </a>
          </div>
          <div className="mt-6 w-full">
            <ButtonDark
              buttonSpan="Verify"
              setOnClick={handleVerifyOTP}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity= {alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
