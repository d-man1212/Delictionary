function handleSearch(event) {
  event.preventDefault();
  var searchInput = document.querySelector('input[name="search"]');
  var searchQuery = searchInput.value.trim();

  if (searchQuery === "") {
    alert("Please enter a search query.");
    return;
  }
  var encodedQuery = searchQuery.replace(/\s/g, "&nbsp;");
  const recipeList = document.getElementById("recipe-list");
  const skeletonCount = 12;
  recipeList.innerHTML = "";
  for (let i = 0; i < skeletonCount; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "recipe-skeleton";
    recipeList.appendChild(skeleton);
  }
  fetch(
    `http://localhost:80/delictionary/php/search.php?search=${encodedQuery}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      recipeList.innerHTML = "";
      displayRecipes(data.hits);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while searching for recipes.");
    });
}

function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipe-list");
  if (recipes.length === 0) {
    recipeList.innerHTML =
      '<u class="no-recipes-found">No recipes found. Please try another search query.</u>';
    return;
  }
  recipes.forEach(({ recipe }) => {
    const { uri, label, image, calories, ingredients, url } = recipe;
    const recipeContainer = document.createElement("div");
    recipeContainer.className = "recipe-container";

    const recipeDetails = `
      <div class="recipe-details">
        <h3>${label}</h3>
        <div class="image-loader"></div>
        <p>Calories: ${Math.round(calories)} kcal</p>
        <p>Ingredients: ${ingredients.length}</p>
        <a href="${url}" target="_blank" rel="noopener noreferrer">View Recipe</a>
        <a href="javascript:void(0);" onclick="saveRecipe('${label}', '${image}', '${url}', event)">Save</a>
      </div>
    `;

    recipeContainer.innerHTML = recipeDetails;
    recipeList.appendChild(recipeContainer);
    const imageLoader = recipeContainer.querySelector(".image-loader");
    const recipeImage = new Image();
    recipeImage.onload = () => {
      imageLoader.parentNode.replaceChild(recipeImage, imageLoader);
    };
    recipeImage.src = image;
    recipeImage.alt = label;
    recipeImage.classList.add("recipe-image");
  });
}

document.getElementById("searchForm").addEventListener("submit", handleSearch);
document.addEventListener("DOMContentLoaded", function () {
  fetchUserProfile();
});

function saveRecipe(label, image, url, event) {
  const saveLink = event.target;
  const isSaved = saveLink.textContent.trim() === "Saved";

  if (isSaved) {
    fetch(`http://localhost:80/delictionary/php/delete_recipe.php`, {
      method: "POST",
      body: JSON.stringify({ label, image, url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          saveLink.textContent = "Save";
          saveLink.classList.remove("saved");
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while removing the recipe.");
      });
  } else {
    fetch(`http://localhost:80/delictionary/php/save_recipe.php`, {
      method: "POST",
      body: JSON.stringify({ label, image, url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          saveLink.textContent = "Saved";
          saveLink.classList.add("saved");
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while saving the recipe.");
      });
  }
}

function fetchUserProfile() {
  fetch("http://localhost:80/delictionary/php/profile.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("displayName").textContent =
          "Greetings " + data.user_info.display_name + "!";
      } else {
        alert(data.message);
        window.location.replace("login.html");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching user profile.");
    });
}
