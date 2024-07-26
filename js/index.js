// ITERATION 1
function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  const priceElement = product.querySelector('.price span');

  const quantityElement = product.querySelector('.quantity input');

  const price = parseFloat(priceElement.innerHTML);
  const quantity = parseInt(quantityElement.value);

  const subtotal = price * quantity;

  const subtotalElement = product.querySelector('.subtotal span');

  subtotalElement.innerHTML = subtotal.toFixed(2);

  return subtotal;
}

function calculateAll() {
  const products = document.querySelectorAll('.product');

  let total = 0;

  products.forEach((product) => {
    total += updateSubtotal(product);
  });

  const totalValueElement = document.querySelector('#total-value span');
  totalValueElement.innerHTML = total.toFixed(2);
}

const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', calculateAll);

// ITERATION 4: Removing Products
function removeProduct(event) {
  const target = event.currentTarget;

  const productRow = target.closest('.product');

  productRow.parentNode.removeChild(productRow);

  calculateAll();
}

function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeProduct);
  });
}

setupRemoveButtons();

// ITERATION 5: Adding New Products
function createProduct() {
  const nameInput = document.getElementById('new-product-name');
  const priceInput = document.getElementById('new-product-price');

  const name = nameInput.value;
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and price.');
    return;
  }

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
  const tbody = document.querySelector('#cart tbody');
  tbody.appendChild(newRow);

  nameInput.value = '';
  priceInput.value = 0;

  setupRemoveButtons();
}

const createButton = document.getElementById('create');
createButton.addEventListener('click', createProduct);

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
