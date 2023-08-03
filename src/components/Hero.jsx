import foodpic from "/assets/food2.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>DISCOVER ENDLESS CULINARY POSSIBILITIES!</h1>
        <p>
          Delictionary is a comprehensive recipe finder web application designed
          to simplify your culinary adventures and enhance your cooking
          experience. With Delictionary, you can explore an extensive collection
          of recipes, discover new dishes, and find inspiration for your next
          meal.
        </p>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </div>
      <div className="hero-image">
        <img src={foodpic} alt="Tasty Food Pic" />
      </div>
    </div>
  );
}
