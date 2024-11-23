document.addEventListener("DOMContentLoaded", function () {
  const categoryButton = document.getElementById("category-dropdown-button");
  const dropdownItems = document.querySelectorAll("#category-dropdown .dropdown-item");


  dropdownItems.forEach(item => {
    item.addEventListener("click", function () {
      // Update the button text with the selected category
      categoryButton.textContent = this.textContent;
    });
  });


  const imageUrlInput = document.getElementById("imageUrl");
  const previewImage = document.getElementById("preview");

  // Listen for changes in the URL input field
  imageUrlInput.addEventListener("input", function () {
    const url = imageUrlInput.value.trim(); // Get the entered URL

    if (url) {
      // Set the src of the preview image
      previewImage.src = url;
      previewImage.style.display = "block"; // Show the preview
      previewImage.style.objectFit = "contain";
      previewImage.style.maxWidth = "100px";
      previewImage.style.maxHeight = "80px";
      previewImage.style.padding = "10px";
      previewImage.style.aspectRatio = "1:1";
    } else {
      // Hide the preview if no URL is entered
      previewImage.style.display = "none";
    }
  });

  // Optional: Add error handling to check if the image URL is valid
  previewImage.onerror = function () {
    alert("Invalid image URL. Please enter a valid URL.");
    previewImage.style.display = "none";
  };

  function validateName(nameField) {
    if (nameField.value === "") {
      nameField.setCustomValidity("Please enter a value!");
      return false;
    }
    nameField.setCustomValidity("");
    return true;
  }

  function validatePrice(price) {
    if (price.value === "" || isNaN(price.value)) {
      price.setCustomValidity("Please enter a valid price!");
      return false;
    }
    price.setCustomValidity("");
    return true;
  }

  function isDropdownSelected(dropdownId) {
    if (dropdownId.textContent === "" || dropdownId.textContent === "Select a Category") {
      alert("Please select a category!");
      return false;
    }
    return true;
  }

  function isImageUploaded(inputId) {
    if (inputId.value === "") {
      alert("Please upload a photo of your product!");
      return false;
    }
    return true;
  }

  function validateInput(name, price, dropdownID, image, description) {
    let isProductName = validateName(name);
    let isProductPrice = validatePrice(price);
    let isProductDropdown = isDropdownSelected(dropdownID);
    let isProductImage = isImageUploaded(image);
    let isDescriptionPara = validateName(description);

    if (isProductName && isProductPrice && isProductDropdown && isProductImage && isProductImage && isDescriptionPara) {
      return true;
    }
    return false;
  }

  document.getElementById("submit-button").addEventListener("click", function () {

    let nameField = document.getElementById("product-name");
    let priceField = document.getElementById("product-price");
    let dropdownID = document.getElementById("category-dropdown-button");
    let image = document.getElementById("imageUrl");
    const preview = document.getElementById("preview");
    let descriptionField = document.getElementById("floatingTextarea");

    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const category = document.getElementById("category-dropdown-button").textContent.trim();
    const description = document.getElementById("floatingTextarea").value;
    const imageFile = document.getElementById("imageUrl").value;

    const submitSuccess = validateInput(nameField, priceField, dropdownID, image, descriptionField);
    if (submitSuccess == true) {
      alert("Item added successfully");
    }


    // Create the product object
    const productData = {
      name: name,
      price: price,
      category: category,
      description: description,
      image: imageFile, // If this is base64 or an image URL
    };

    // Send data to the API
    fetch("https://672ddcb2fd8979715644034c.mockapi.io/products/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add product");
        }
        return response.json();
      })
      .then((data) => {
        alert("Product added successfully: " + data.id); // Display success message
        console.log(data); // Optionally log the response
        // Clear form fields
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });

});
