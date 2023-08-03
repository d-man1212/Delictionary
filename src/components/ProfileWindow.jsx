import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { validatePassword } from "../utils/regexConditions";
import PopUp from "./PopUp";

export default function ProfileWindow() {
  const { currentUser, logout, updatePassword, deleteAccount } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupErrorDetails, setPopupErrorDetails] = useState("");

  const showErrorPopup = (message, error, errorDetails) => {
    setPopupMessage(message);
    setPopupError(error);
    setPopupErrorDetails(errorDetails);
    setIsPopupOpen(true);
  };

  const handleChangePassword = async () => {
    setIsPasswordChanged(false);
    if (!validatePassword(newPassword)) {
      showErrorPopup(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        "Password Change Failure",
        "Invalid password format."
      );
      return;
    }

    try {
      await updatePassword(newPassword);
      setIsPasswordChanged(true);
      setNewPassword("");
    } catch (error) {
      showErrorPopup(
        "Failed to update password. Please try again.",
        error.code,
        error.message
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      showErrorPopup(
        "Failed to delete account. Please try again.",
        error.code,
        error.message
      );
    }
  };

  if (currentUser === null) {
    return (
      <div className="bg-sign">
        <h1>Please log in first!</h1>
      </div>
    );
  }

  return (
    <div className="bg-sign">
      <div className="sign">
        <h1>{currentUser.displayName}</h1>
        <img className="pfp" src={currentUser.photoURL} alt="Profile Picture" />
        <p>
          <u>EMAIL </u>
        </p>
        <p className="mail">{currentUser.email}</p>
        <div className="input-container">
          <input
            className="top-input"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="login-button">
          <button onClick={handleChangePassword}>Change Password</button>
          {isPasswordChanged && (
            <p style={{ color: "green" }}>Password updated successfully!</p>
          )}
          <button onClick={handleDeleteAccount}>Delete Account</button>
          <button onClick={() => logout()}>Logout</button>
        </div>

        {isPopupOpen && (
          <PopUp
            onClose={() => setIsPopupOpen(false)}
            Error={popupError}
            message={popupMessage}
            errorDetails={popupErrorDetails}
          />
        )}
      </div>
    </div>
  );
}