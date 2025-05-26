const cartCountEl = document.getElementById('cart-count');
const cartListEl = document.getElementById('cart-list');
const emptyMsgEl = document.getElementById('empty-msg');
const toastEl = document.getElementById('toast');
const paymentBtnContainer = document.getElementById('payment-button-container');
const totalPriceEl = document.getElementById('paystackTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('payWithPaystack').addEventListener('click', payWithPaystack);

function renderCart() {
  cartListEl.innerHTML = '';
    let total = 0;
  if (cart.length === 0) {
    emptyMsgEl.classList.remove('hidden');
    cartCountEl.textContent = 0;
    paymentBtnContainer.style.display = 'none'; // hide payment button
    
    return;
  } else {
    emptyMsgEl.classList.add('hidden');
    paymentBtnContainer.style.display = 'flex'; // show payment button
  }

  

  cart.forEach((item, index) => {
    total += item.price;

    const card = document.createElement('div');
    card.className = "bg-white shadow-md rounded-2xl p-4 flex items-center gap-4";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
      <div class="flex-grow">
        <h3 class="text-lg font-semibold">${item.name}</h3>
        <p class="text-gray-600">$${item.price.toFixed(2)}</p>
      </div>
      <button 
        class="bg-[#FF9900] hover:bg-[#F08112] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
        onclick="removeFromCart(${index})"
      >
        Remove
      </button>
    `;

    cartListEl.appendChild(card);
  });

  cartCountEl.textContent = cart.length;
  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  showToast(`Removed ${removedItem.name} from cart`);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2000);
}

function payWithPaystack() {
  if (cart.length === 0) {
    showToast("Cart is empty. Add items before paying.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handler = PaystackPop.setup({
    key: 'pk_test_ec3f744b76592127eeae75d5018d21ab2b0a4129', // Your test key here
    email: 'trustkalonu12@gmail.com', // Replace with actual user email if available
    amount: total * 100, // Convert to kobo
    currency: 'NGN',
    ref: 'BAM_' + Math.floor(Math.random() * 1000000000),
    callback: function(response) {
      showToast("✅ Payment successful! Ref: " + response.reference);
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    },
    onClose: function() {
      showToast("Payment cancelled.");
    }
  });

  handler.openIframe();
}

// Initial render on page load
renderCart();
cartCountEl.textContent = cart.length;
