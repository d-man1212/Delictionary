import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { validateEmail } from "../utils/regexConditions";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [errorPopup, setErrorPopup] = useState({
    show: false,
    Error: "",
    message: "",
    errorDetails: "",
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      setErrorPopup({ show: false, Error: "", message: "", errorDetails: "" });
      setLoading(true);

      if (!validateEmail(email)) {
        setErrorPopup({
          show: true,
          Error: "Reset Password Failure",
          message: "Invalid Email",
          errorDetails: "Please enter a valid email address.",
        });
        setLoading(false);
        return;
      }
      setLoading(true);
      await resetPassword(email);
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Reset Password Failure",
        message: "Failed to reset password",
        errorDetails: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sign">
      <div className="sign">
        <h1>FORGOT PASSWORD</h1>
        <div className="login-form">
          <div className="input-container">
            <input
              className="top-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="login-button">
          <button
            className="login-button"
            disabled={loading}
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
      {errorPopup.show && (
        <PopUp
          Error={errorPopup.Error}
          message={errorPopup.message}
          errorDetails={errorPopup.errorDetails}
          onClose={() =>
            setErrorPopup({
              show: false,
              Error: "",
              message: "",
              errorDetails: "",
            })
          }
        />
      )}
      {showSuccessPopup && (
        <PopUp
          Error="Password Reset Email Sent"
          message="An email has been sent to reset your password."
          errorDetails="Please check your inbox for further instructions."
          onClose={() => {
            setShowSuccessPopup(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
