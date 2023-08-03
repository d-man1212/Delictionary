import logo from "/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function Navigation() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div>
      <nav>
        <div onClick={() => navigate("/")} className="logo">
          <img src={logo} alt="Logo" />
          Delictionary
        </div>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/recipes")}>Recipes</li>
          <li onClick={() => navigate("/register")}>Register</li>
          <li onClick={() => navigate("/login")}>Login</li>
          {currentUser && <li onClick={() => navigate("/profile")}>Profile</li>}
        </ul>
      </nav>
    </div>
  );
}
