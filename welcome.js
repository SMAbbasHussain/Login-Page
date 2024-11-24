document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://672ddcb2fd8979715644034c.mockapi.io/products/products";
  const productSection = document.getElementById("product-section");
  const sidebarLinks = document.querySelectorAll("#sidebarMenu ul li a"); // Select sidebar category links
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let allProducts = []; // Store all products for filtering

  // Fetch products from the API
  async function fetchProducts() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      allProducts = await response.json(); // Store products for filtering
      displayProducts(allProducts); // Display all products initially
    } catch (error) {
      console.error(error);
      alert("Error fetching products. Please try again later.");
    }
  }

  // Display products in the grid
  function displayProducts(products) {
    productSection.innerHTML = ""; // Clear existing products

    if (products.length === 0) {
      productSection.innerHTML = `<p>No products found in this category.</p>`;
      return;
    }

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

      productCard.innerHTML = `
        <div class="card col-4" style="width: 100%; padding: 0">
          <img
            src="${product.image}"
            class="card-img-top"
            alt="${product.name}"
            style="object-fit: cover; height: 180px;"
          />
          <div class="card-body">
            <h5 class="card-title"><b>${product.name}</b></h5>
            <p class="card-text"><b>Price:</b> $${product.price}</p>
            <p class="card-text"><b>Description:</b> ${product.description}</p>
            <button id="add-btn" class="add-btn btn btn-primary" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Buy</button>
          </div>
        </div>
      `;

      productSection.appendChild(productCard);
    });

    setupEventListeners();
  }

  // Filter products by category
  function filterProductsByCategory(category) {
    const filteredProducts = allProducts.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filteredProducts);
  }

  // Set up event listeners for sidebar links
  function setupSidebarFilters() {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.textContent; // Get category name from the link text
        filterProductsByCategory(category);
      });
    });
  }

  // Set up event listeners for "Buy" buttons
  function setupEventListeners() {
    const addButtons = document.querySelectorAll("#add-btn");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        addToCart({ id, name, price });
        alert(name + " added to cart!");
      });
    });
  }

  // Add a product to the cart
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if the product already exists in the cart
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart();
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  fetchProducts(); // Fetch and display products on page load
  setupSidebarFilters(); // Set up sidebar filters
});
