document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    fetch("http://localhost:80/delictionary/php/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.href = "profile.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      });
  });
