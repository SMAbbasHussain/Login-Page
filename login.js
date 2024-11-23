// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.querySelector("form");

  // Attach an event listener to the form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the input fields
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    // Validate input fields
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    // Send a GET request to fetch all users from the API
    fetch("https://672ddcb2fd8979715644034c.mockapi.io/products/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((users) => {
        // Search for a user with the matching username and password
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        // Check if the user is found and credentials match
        if (user) {
          alert("Login successful!");
          window.location.href = "welcome.html"; // Redirect to the dashboard or homepage
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while logging in. Please try again.");
      });
  });
});
