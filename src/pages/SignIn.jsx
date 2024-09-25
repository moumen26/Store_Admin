import React, { useState } from "react";
import InputForm from "../components/InputForm";
import ButtonDark from "../components/ButtonDark";
import ButtonFacebok from "../components/ButtonFacebok";
import { useAuthContext } from "../hooks/useAuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle username text change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle password text change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_APP_URL_BASE + "/auth/signin/admin",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            UserName: username,
            Password: password,
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setSnackbarMessage(json.message);
        setSnackbarOpen(true);
        setLoading(false);
      } else {
        // Save the user in local storage
        localStorage.setItem("user", JSON.stringify(json));
        // Update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again later.");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="signIn">
      <div className="w-full h-[80px] flex justify-between items-center pl-10 pr-10 border-b-2 border-[#C9E4EE]">
        <h2 className="headerText logoText">Stock</h2>
      </div>
      <div className="signInContainer w-full flex items-center justify-center">
        <div className="signInContainerRightContainer">
          <h2 className="titleText text-center">Log in to Stock</h2>
          <div className="logInForm">
            <form onSubmit={handleLoginSubmit}>
              <InputForm
                labelForm="Phone Number"
                inputType="phone"
                inputPlaceholder="+213"
                inputName="phoneNumber"
                setChangevalue={handleUsernameChange}
              />
              <InputForm
                labelForm="Password"
                inputType="password"
                inputPlaceholder="Your password"
                inputName="password"
                setChangevalue={handlePasswordChange}
              />
              <a href="">Forgot Password?</a>
              <ButtonDark
                buttonSpan="Log in"
                setOnClick={handleLoginSubmit}
                loading={loading}
              />
            </form>
            <div className="orClass">
              <div className="lineOr"></div>
              <span className="orText">or</span>
              <div className="lineOr"></div>
            </div>
            <ButtonFacebok />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
