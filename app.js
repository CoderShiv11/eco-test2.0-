// Initialize cart from localStorage or as an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add products to the cart
function addToCart(name, price, image) {
  const product = cart.find((item) => item.name === name);
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product is added to cart Please click go to buy cart button!');
}

// Function to render the cart
function renderCart() {
  const tableBody = document.querySelector('#cart-items tbody');
  tableBody.innerHTML = '';

  if (cart.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6">Your cart is empty!</td></tr>';
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" class="cart-img"></td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>
        <button class="decrease" data-index="${index}">-</button>
        ${item.quantity}
        <button class="increase" data-index="${index}">+</button>
      </td>
      <td>₹${item.price * item.quantity}</td>
      <td><button class="remove" data-index="${index}">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Attach event listeners to cart actions
  document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', () => updateQuantity(button.dataset.index, -1));
  });

  document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', () => updateQuantity(button.dataset.index, 1));
  });

  document.querySelectorAll('.remove').forEach((button) => {
    button.addEventListener('click', () => removeProduct(button.dataset.index));
  });

  document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    if (cart.length > 0) {
      window.location.href = 'billing.html';
    } else {
      alert('Your cart is empty!');
    }
  });
}

// Update product quantity in the cart
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove a product from the cart
function removeProduct(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Handle billing form submission
function handleBillingForm() {
  const billingForm = document.getElementById('billing-form');
  if (billingForm) {
    billingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }
}

// Add event listeners for "Add to Cart" buttons on the Home Page
function initializeHomePage() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price, 10);
      const image = button.dataset.image;
      addToCart(name, price, image);
    });
  });

// Determine the current page and run the appropriate script
if (window.location.pathname.includes('index.html')) {
  initializeHomePage();
} else if (window.location.pathname.includes('cart.html')) {
  renderCart();
} else if (window.location.pathname.includes('billing.html')) {
  handleBillingForm();
}

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Re-render the cart
  renderCart();
}

// Remove a product from the cart
function removeProduct(index) {
  cart.splice(index, 1);

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Re-render the cart
  renderCart();
}

// Load the cart on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }

  // Attach add-to-cart event listeners to buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.parentElement.querySelector('img').src;

      addToCart(name, price, image);
    });
  });
});

const searchBar = document.getElementById('search-bar');
const suggestions = document.getElementById('suggestions');

// Map product names to their corresponding image URLs
const productMap = {
  "Sweet Shirt": "images/clothes/1.0.webp",
  "Formal Shirt": "images/clothes/2.0.webp",
  "Hoodie": "images/clothes/3.0.webp",
  "Dark Red Frock": "images/clothes/4.0.webp",
  "Hoodie Jacket": "images/clothes/5.0.webp",
  "Red Frock": "images/clothes/6.0.webp",
  "Red Shoes": "images/Accessories/1.jpg",
  "Lite Blue Shoes": "images/Accessories/2.jpg",
  "Smart Watch": "images/Accessories/3.jpg",
  "Earbuds": "images/Accessories/4.jpg"
};

// Show suggestions based on user input
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  suggestions.innerHTML = ""; // Clear previous suggestions

  if (query) {
    const filteredProducts = Object.keys(productMap).filter(product =>
      product.toLowerCase().includes(query)
    );

    // Display matching suggestions
    filteredProducts.forEach(product => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = product;

      // Add click event to redirect to the product's image
      suggestionItem.addEventListener('click', () => {
        searchBar.value = ""; // Clear search bar after selection
        suggestions.style.display = "none"; // Hide suggestions
        window.location.href = productMap[product]; // Redirect to product image URL
      });

      suggestions.appendChild(suggestionItem);
    });

    suggestions.style.display = "block"; // Show suggestions
  } else {
    suggestions.style.display = "none"; // Hide suggestions if the query is empty
  }
});

// Hide suggestions when clicking outside the search bar or suggestions
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-container')) {
    suggestions.style.display = "none";
  }
});

// Hide suggestions when clicking outside the search bar or suggestions
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-container')) {
    suggestions.style.display = "none";
  }
});
