document.addEventListener("DOMContentLoaded", function () {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.style.marginBottom = '10px';
      productDiv.style.border = '1px solid #ddd';
      productDiv.style.padding = '10px';

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.style.width = '100px';
      productImage.style.height = '100px';
      productDiv.appendChild(productImage);

      const productName = document.createElement('h3');
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price}`;
      productDiv.appendChild(productPrice);

      const productCategory = document.createElement('p');
      productCategory.textContent = `Category: ${product.category}`;
      productDiv.appendChild(productCategory);

      const productDescription = document.createElement('p');
      productDescription.textContent = product.description;
      productDiv.appendChild(productDescription);

      productList.appendChild(productDiv);
    });
  }

  displayProducts(); // Display products when the page loads

})