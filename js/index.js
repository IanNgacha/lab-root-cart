// ITERATION 1
function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  // Get the price element
  const priceElement = product.querySelector('.price span');
  // Get the quantity input element
  const quantityElement = product.querySelector('.quantity input');

  // Extract the values from the DOM elements
  const price = parseFloat(priceElement.innerHTML);
  const quantity = parseInt(quantityElement.value);

  // Calculate the subtotal price
  const subtotal = price * quantity;

  // Get the DOM element that should hold the subtotal
  const subtotalElement = product.querySelector('.subtotal span');

  // Set the subtotal price to the corresponding DOM element
  subtotalElement.innerHTML = subtotal.toFixed(2);

  // Return the subtotal value
  return subtotal;
}

function calculateAll() {
  // Get all product rows
  const products = document.querySelectorAll('.product');

  // Initialize total value
  let total = 0;

  // Loop through each product and update subtotal
  products.forEach(product => {
    total += updateSubtotal(product);
  });

  // Update the total value in the DOM
  const totalValueElement = document.querySelector('#total-value span');
  totalValueElement.innerHTML = total.toFixed(2);
}

// Add event listener to the "Calculate Prices" button
const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', calculateAll);

// ITERATION 4: Removing Products
function removeProduct(event) {
  const target = event.currentTarget;
  
  // Get the product row
  const productRow = target.closest('.product');

  // Remove the product row from the DOM
  productRow.parentNode.removeChild(productRow);

  // Recalculate the total price after removal
  calculateAll();
}

// Add event listeners to all "Remove" buttons
function setupRemoveButtons() {
  // Get all remove buttons
  const removeButtons = document.querySelectorAll('.btn-remove');

  // Loop through each remove button and add the click event listener
  removeButtons.forEach(button => {
    button.addEventListener('click', removeProduct);
  });
}

// Set up the remove buttons on page load
setupRemoveButtons();

// ITERATION 5: Adding New Products
function createProduct() {
  // Get the values from the input fields
  const nameInput = document.getElementById('new-product-name');
  const priceInput = document.getElementById('new-product-price');
  
  const name = nameInput.value;
  const price = parseFloat(priceInput.value);

  // Check for valid input
  if (!name || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and price.');
    return;
  }

  // Create a new product row
  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `
    <td class="name">
      <span>${name}</span>
    </td>
    <td class="price">$<span>${price.toFixed(2)}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  // Append the new row to the table body
  const tbody = document.querySelector('#cart tbody');
  tbody.appendChild(newRow);

  // Clear the input fields
  nameInput.value = '';
  priceInput.value = 0;

  // Set up the remove button for the new row
  setupRemoveButtons();
}

// Add event listener to the "Create Product" button
const createButton = document.getElementById('create');
createButton.addEventListener('click', createProduct);


window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
