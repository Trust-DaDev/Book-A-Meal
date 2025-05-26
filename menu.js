const meals = [
  { name: 'Spaghetti', price: 2.00, image: 'cook.jpg' },
  { name: 'Jollof Rice', price: 2.50, image: 'riced.jpg' },
  { name: 'Pizza', price: 10.00, image: 'aff.jpg' },
  { name: 'Rice & Beans', price: 2.00, image: 'rice-beans.jpg' },
  { name: 'Nkwobi', price: 3.00, image: 'nkwobi.jpg' },
  { name: 'Ogbonno', price: 2.00, image: 'ogbono.jpg' },
  { name: 'Egusi', price: 2.00, image: 'egusi.jpg' },
  { name: 'Fried Rice', price: 2.50, image: 'fried.jpg' },
  { name: 'Abacha', price: 1.50, image: 'abacha.jpg' },
  { name: 'Peppersoup', price: 3.00, image: 'pepper.jpeg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const mealContainer = document.getElementById('meal-container');

meals.forEach((meal, index) => {
  const card = document.createElement('div');
  card.className = "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center";
  card.innerHTML = `
    <img src="${meal.image}" alt="${meal.name}" class="w-full h-40 object-cover rounded-xl" />
    <h3 class="mt-4 text-lg font-semibold">${meal.name}</h3>
    <p class="text-sm text-gray-600 mb-3">$${meal.price.toFixed(2)}</p>
    <button onclick="addToCart(${index})" class="mt-auto bg-[#FF9900] hover:bg-[#F08112] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all">
      Add to Cart
    </button>`;
  mealContainer.appendChild(card);
});

function addToCart(index) {
  cart.push(meals[index]);
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-count').textContent = cart.length;
  showToast('Added to cart!');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

document.getElementById('cart-count').textContent = cart.length;
