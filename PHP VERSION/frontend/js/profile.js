document.addEventListener("DOMContentLoaded", function () {
  fetchUserProfile().then((loggedIn) => {
    if (loggedIn) {
      fetchSavedRecipes();
    }
  });
});
function fetchSavedRecipes() {
  fetch("http://localhost:80/delictionary/php/saved_recipes.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        displaySavedRecipes(data.recipes);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching saved recipes.");
    });
}
function displaySavedRecipes(recipes) {
  const savedRecipesDiv = document.getElementById("recipe-list");
  savedRecipesDiv.innerHTML = "";

  if (recipes.length === 0) {
    savedRecipesDiv.textContent = "No saved recipes found.";
  } else {
    recipes.forEach((recipe) => {
      const { recipe_label, recipe_image, recipe_url } = recipe;

      const recipeContainer = document.createElement("div");
      recipeContainer.className = "recipe-container";

      const recipeDetails = `
                <div class="recipe-details">
                    <h3>${recipe_label}</h3>
                    <img src="${recipe_image}" alt = "${recipe_label}" class="recipe-image" />
                    <a href="${recipe_url}" target="_blank" rel="noopener noreferrer">View Recipe</a>
                    <a href="javascript:void(0);" onclick="deleteRecipe('${recipe_label}', '${recipe_image}', '${recipe_url}')">Delete</button>
                </div>
            `;

      recipeContainer.innerHTML = recipeDetails;
      savedRecipesDiv.appendChild(recipeContainer);
    });
  }
}
function deleteRecipe(label, image, url) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    fetch("http://localhost:80/delictionary/php/delete_recipe.php", {
      method: "POST",
      body: JSON.stringify({ label, image, url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.reload();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while deleting the recipe.");
      });
  }
}
document
  .getElementById("changeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    fetch("http://localhost:80/delictionary/php/change.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      });
  });
function handleDeleteAccount() {
  if (confirm("Are you sure you want to delete your account?")) {
    fetch("http://localhost:80/delictionary/php/delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deleteAccount: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.href = "login.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function handleLogout() {
  fetch("http://localhost:80/delictionary/php/logout.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
        window.location.href = "login.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function fetchUserProfile() {
  return fetch("http://localhost:80/delictionary/php/profile.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("displayName").textContent =
          data.user_info.display_name;
        document.getElementById("email").textContent = data.user_info.email;
        return true;
      } else {
        alert(data.message);
        window.location.replace("login.html");
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching user profile.");
      return false;
    });
}
