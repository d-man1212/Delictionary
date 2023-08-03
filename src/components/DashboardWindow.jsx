import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import search from "/assets/search.png";
import edamamConfig from "../../edamam.config";
import PopUp from "./PopUp";

const DashboardWindow = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageUrls, setPageUrls] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // const handleDisplayNameClick = async () => {
  //   await logout();
  // };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const buildApiUrl = (query, pageUrl = "") => {
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=${query}&app_id=${edamamConfig.appId}&app_key=${edamamConfig.appKey}`;
    return pageUrl ? pageUrl : baseUrl;
  };

  const handleSearchSubmit = async () => {
    if (searchInput.trim() === "") {
      setErrorDetails("Please enter one or more keywords.");
      setShowErrorPopup(true);
      return;
    }

    try {
      const apiUrl = buildApiUrl(searchInput);
      const response = await axios.get(apiUrl);
      if (response.data.hits.length === 0) {
        setShowErrorPopup(true);
      } else {
        setRecipes(response.data.hits);
        setPageUrls([apiUrl, response.data._links.next?.href || ""]);
        setCurrentPage(1);
      }
    } catch (error) {
      setErrorDetails(error);
      setShowErrorPopup(true);
    }
  };

  const handleNextPage = async () => {
    const nextPageUrl = pageUrls[pageUrls.length - 1];
    if (nextPageUrl) {
      try {
        const response = await axios.get(nextPageUrl);
        setRecipes(response.data.hits);
        setPageUrls([...pageUrls, response.data._links.next?.href || ""]);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        setErrorDetails(error);
        setShowErrorPopup(true);
      }
    }
  };

  const handlePrevPage = async () => {
    const prevUrlIndex = pageUrls.length - 3;
    const prevUrl = pageUrls[prevUrlIndex];
    if (prevUrl) {
      try {
        const response = await axios.get(prevUrl);
        setRecipes(response.data.hits);
        setPageUrls((urls) => urls.slice(0, urls.length - 1));
        setCurrentPage(currentPage - 1);
      } catch (error) {
        setErrorDetails(error);
        setShowErrorPopup(true);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  if (currentUser === null) {
    return (
      <div className="bg-sign">
        <h1>Please log in first!</h1>
      </div>
    );
  } else {
    const { displayName } = currentUser;

    return (
      <div className="bg-sign">
        <div className="big-sign">
          <h1>
            Welcome to Delictionary
            <br />
            <u className="display-name" onClick={() => navigate("/profile")}>
              {displayName}
            </u>
          </h1>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type one or more keywords"
            />
            <div className="eye-icon" onClick={handleSearchSubmit}>
              <img src={search} alt="Search" />
            </div>
          </div>

          <div className="recipe-list">
            {recipes.map(({ recipe }) => {
              const { uri, label, image, calories, ingredients, url } = recipe;
              return (
                <div key={uri} className="recipe-container">
                  <div className="recipe-details">
                    <h3>{label}</h3>
                    <img src={image} alt={label} />
                    <p>Calories: {Math.round(calories)} kcal</p>
                    <p>Ingredients: {ingredients.length}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      View Recipe
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            {currentPage > 1 && (
              <button className="two-buttons" onClick={handlePrevPage}>
                Previous
              </button>
            )}
            {pageUrls[pageUrls.length - 1] && (
              <button
                className={currentPage > 1 ? "two-buttons" : "only-next"}
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </div>
        </div>
        {showErrorPopup && (
          <PopUp
            onClose={() => setShowErrorPopup(false)}
            Error="No Search Results"
            message="No recipes found for your search."
            errorDetails={errorDetails}
          />
        )}
      </div>
    );
  }
};

export default DashboardWindow;
