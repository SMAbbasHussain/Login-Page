document.addEventListener("DOMContentLoaded", function () {
  const categoryButton = document.getElementById("category-dropdown-button");
  const dropdownItems = document.querySelectorAll("#category-dropdown .dropdown-item");


  dropdownItems.forEach(item => {
    item.addEventListener("click", function () {
      // Update the button text with the selected category
      categoryButton.textContent = this.textContent;
    });
  });


  const productImageInput = document.getElementById("productImage");
  const previewImage = document.getElementById("preview");

  productImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "inline-block";
        previewImage.style.objectFit = "contain"
        previewImage.style.maxWidth = "100px"
        previewImage.style.maxHeight = "80px"
        previewImage.style.padding = "10px"
        previewImage.style.aspectRatio = "1:1"  // Show the image preview
      };

      reader.readAsDataURL(file); // Convert the file to a base64 string for preview
    } else {
      previewImage.style.display = "none"; // Hide preview if not an image
      alert("Please upload a valid image file.");
    }
  });

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
      console.log("price");
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
    if (inputId.files.length === 0) {
      console.log("inside");
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
    console.log("asdasd");
    return false;
  }

  let name = document.getElementById("product-name");
  let price = document.getElementById("product-price");
  let dropdownID = document.getElementById("category-dropdown-button");
  let image = document.getElementById("productImage");
  const preview = document.getElementById("preview");
  let description = document.getElementById("floatingTextarea");

  document.getElementById("submit-button").addEventListener("click", function () {

    const submitSuccess = validateInput(name, price, dropdownID, image, description);
    if (submitSuccess == true) {
      alert("Item added successfully");
      name.value = "";
      price.value = "";
      dropdownID.innerText = "Select a Category";
      image.value = "";
      description.value = "";
      preview.src = "";
      preview.style.display = "none"
    }
  });

  document.getElementById("submit-button").addEventListener("click", function () {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const category = document.getElementById("category-dropdown-button").textContent;
    const description = document.getElementById("floatingTextarea").value;
    const imageFile = document.getElementById("preview").src;


    const reader = new FileReader();

    reader.onload = function () {
      // Create a product object and store it in the array
      const product = {
        name: name,
        price: price,
        category: category,
        image: imageFile,  // Base64 image string
        description: description
      };
      let products = JSON.parse(localStorage.getItem('products')) || [];
      console.log("hehe2");
      console.table(products);
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));

      // Add the product to the products array
      products.push(product);
    };

  });

});
