import { useState } from "react";
import PopUp from "./PopUp";
import { validateEmail, validatePassword } from "../utils/regexConditions";
import eyeIcon from "/assets/eye.png";
import eyeClosedIcon from "/assets/eye-closed.png";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function RegisterWindow() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setErrorPopup({
          show: true,
          Error: "Sign-Up Failure",
          message: "Invalid Email",
          errorDetails: "Please enter a valid email address.",
        });
      } else if (!validatePassword(password)) {
        setErrorPopup({
          show: true,
          Error: "Sign-Up Failure",
          message: "Invalid Password",
          errorDetails:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one symbol, one lowercase letter, and one number.",
        });
      } else if (password !== confirmPassword) {
        setErrorPopup({
          show: true,
          Error: "Sign-Up Failure",
          message: "Passwords do not match",
          errorDetails: "Please make sure the passwords match.",
        });
      } else {
        setErrorPopup({
          show: false,
          Error: "",
          message: "",
          errorDetails: "",
        });
        setLoading(true);
        await signup(email, password, displayName);
        setShowSuccessPopup(true);
      }
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Error",
        message: "Failed to create an account",
        errorDetails: error.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-sign">
      <div className="sign">
        <h1>REGISTER</h1>
        <div className="login-form">
          <div className="input-container">
            <input
              className="top-input"
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <img src={eyeClosedIcon} alt="Hide" />
              ) : (
                <img src={eyeIcon} alt="Show" />
              )}
            </div>
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <img src={eyeClosedIcon} alt="Hide" />
              ) : (
                <img src={eyeIcon} alt="Show" />
              )}
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/login")} className="account-exists">
          <p>Already have an account?</p>
        </div>
        <div className="login-button">
          <button
            className="login-button"
            disabled={loading}
            onClick={handleRegister}
          >
            Register
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
          Error="SUCCESS"
          message="Registration Successful!"
          errorDetails="Please close this window to continue to the login page."
          onClose={() => {
            setShowSuccessPopup(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
