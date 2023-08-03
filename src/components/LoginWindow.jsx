import { useState } from "react";
import twittergif from "/assets/twitter.gif";
import gmailgif from "/assets/gmail.gif";
import facebookgif from "/assets/facebook.gif";
import twitterimg from "/assets/twitter.png";
import gmailimg from "/assets/gmail.png";
import facebookimg from "/assets/facebook.png";
import eyeIcon from "/assets/eye.png";
import eyeClosedIcon from "/assets/eye-closed.png";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { useAuth } from "../Contexts/AuthContext";
import { validateEmail } from "../utils/regexConditions";

export default function LoginWindow() {
  const navigate = useNavigate();
  const { login, loginWithTwitter, loginWithFacebook, loginWithGoogle } =
    useAuth();
  const [social, setSocial] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [errorPopup, setErrorPopup] = useState({
    show: false,
    Error: "",
    message: "",
    errorDetails: "",
  });

  const handleMouseEnter = (platform) => {
    setSocial(platform);
  };

  const handleMouseLeave = () => {
    setSocial("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };

  const handleLogin = async () => {
    try {
      setErrorPopup({ show: false, Error: "", message: "", errorDetails: "" });
      setLoading(true);
      if (!validateEmail(email)) {
        setErrorPopup({
          show: true,
          Error: "Sign-In Failure",
          message: "Invalid Email",
          errorDetails: "Please enter a valid email address.",
        });
        setLoading(false);
        return;
      }

      setLoading(true);
      await login(email, password);
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Sign-In Failure",
        message: "Incorrect username or password",
        errorDetails: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithTwitter = async () => {
    try {
      setErrorPopup({
        show: false,
        Error: "",
        message: "",
        errorDetails: "",
      });
      setLoading(true);
      await loginWithTwitter();
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Twitter Login Failure",
        message: "Failed to login with Twitter",
        errorDetails: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      setErrorPopup({
        show: false,
        Error: "",
        message: "",
        errorDetails: "",
      });
      setLoading(true);
      await loginWithFacebook();
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Facebook Login Failure",
        message: "Failed to login with Facebook",
        errorDetails: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      setErrorPopup({
        show: false,
        Error: "",
        message: "",
        errorDetails: "",
      });
      setLoading(true);
      await loginWithGoogle();
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorPopup({
        show: true,
        Error: "Google Login Failure",
        message: "Failed to login with Google",
        errorDetails: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sign">
      <div className="sign">
        <h1>LOGIN</h1>
        <div className="sign-social">
          <button
            className="Twitter"
            disabled={loading}
            onMouseEnter={() => handleMouseEnter("twitter")}
            onClick={handleLoginWithTwitter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={social === "twitter" ? twittergif : twitterimg}
              alt="Twitter"
            />
          </button>
          <button
            className="Gmail"
            onClick={handleLoginWithGoogle}
            disabled={loading}
            onMouseEnter={() => handleMouseEnter("gmail")}
            onMouseLeave={handleMouseLeave}
          >
            <img src={social === "gmail" ? gmailgif : gmailimg} alt="Gmail" />
          </button>
          <button
            className="Facebook"
            disabled={loading}
            onMouseEnter={() => handleMouseEnter("facebook")}
            onClick={handleLoginWithFacebook}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={social === "facebook" ? facebookgif : facebookimg}
              alt="Facebook"
            />
          </button>
        </div>
        <div className="or">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>
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
          <div className="remember-forgot-container">
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Remember Me
              </label>
            </div>
            <div
              onClick={() => navigate("/forgot-pass")}
              className="forgot-password"
            >
              <p>Forgot Password?</p>
            </div>
          </div>

          <div className="login-button">
            <button
              className="login-button"
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
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
          message="Login Successful!"
          errorDetails="Please close this window to continue to the menu page."
          onClose={() => {
            setShowSuccessPopup(false);
            navigate("/recipes");
          }}
        />
      )}
    </div>
  );
}
