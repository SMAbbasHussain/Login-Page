document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalBillElement = document.getElementById("total-bill");

  // Retrieve cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart in localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Display cart items
  function displayCart() {
    cartItemsContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
      totalBillElement.textContent = "Total Bill: $0.00";
      return;
    }

    let totalBill = 0;
    cartItemsContainer.innerHTML = `
    <div class="itemDetail">
      <div>
        <h3>Item Name</h3>
      </div>
      <div>
        <h3>Price</h3>
      </div>
      <div>
        <h3>Actions</h3>
      </div>
    </div>
    `;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "itemDetail";

      itemDiv.innerHTML = `
        <div>
          <strong>${item.name}</strong> (x${item.quantity})
        </div>
        <div>
          $${(item.price * item.quantity).toFixed(2)}
        </div>
        <div class="cart-btn">
          <button data-index="${index}" class="add-btn btn btn-primary">Add</button>
          <button data-index="${index}" class="remove-btn btn btn-danger">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);

      totalBill += item.price * item.quantity;
    });

    totalBillElement.textContent = `Total Bill: $${totalBill.toFixed(2)}`;

    // Add event listeners for Add and Remove buttons
    setupEventListeners();
  }

  // Add event listeners to buttons
  function setupEventListeners() {
    const addButtons = document.querySelectorAll(".add-btn");
    const removeButtons = document.querySelectorAll(".remove-btn");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        addToCart(index);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  }

  // Add to cart (increase quantity)
  function addToCart(index) {
    cart[index].quantity += 1;
    saveCart();
    displayCart();
  }

  // Remove from cart (decrease quantity or remove item)
  function removeFromCart(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      // Remove item if quantity is 0
      cart.splice(index, 1);
    }
    saveCart();
    displayCart();
  }

  displayCart(); // Show cart items on page load
});
