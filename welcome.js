document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://672ddcb2fd8979715644034c.mockapi.io/products/products";
  const productSection = document.getElementById("product-section");

  // Fetch products from the API
  async function fetchProducts() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error(error);
      alert("Error fetching products. Please try again later.");
    }
  }

  // Display products in the grid
  function displayProducts(products) {
    productSection.innerHTML = ""; // Clear existing products

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";

      productCard.innerHTML = `
        <div class="card" style="width: 15rem;">
          <img
            src="${product.image}"
            class="card-img-top"
            alt="${product.name}"
            style="object-fit: cover; height: 180px;"
          />
          <div class="card-body">
            <h5 class="card-title"><b>${product.name}</b></h5>
            <p class="card-text"><b>Price:</b> $${product.price}</p>
            <p class="card-text"><b>Category:</b> ${product.category}</p>
            <p class="card-text"><b>Description:</b> ${product.description}</p>
          </div>
        </div>
      `;
      productSection.appendChild(productCard);
    });
  }

  fetchProducts(); // Fetch and display products on page load
});
