document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const orderButton = document.querySelector('.order-button');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalElement = document.querySelector('.total-value');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
  });

  orderButton.addEventListener('click', order);

  function addToCart(event) {
      const product = event.target.parentElement;
      const productName = product.querySelector('.product-name').innerText;
      const productPrice = product.querySelector('.product-price').innerText;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <span class="cart-item-name">${productName}</span>
          <span class="cart-item-price">${productPrice}</span>
          <div class="quantity">
              <button class="decrease-quantity">-</button>
              <span class="quantity-value">1</span>
              <button class="increase-quantity">+</button>
          </div>
          <button class="delete-item">Sil</button>
      `;

      cartItemsContainer.appendChild(cartItem);

      updateTotal();
  }

  function updateTotal() {
      const cartItems = document.querySelectorAll('.cart-item');
      let total = 0;

      cartItems.forEach(item => {
          const price = parseFloat(item.querySelector('.cart-item-price').innerText.replace('TL', ''));
          const quantity = parseInt(item.querySelector('.quantity-value').innerText);
          total += price * quantity;
      });

      totalElement.innerText = total + ' TL';

  }

  function order() {
      if (cartItemsContainer.children.length === 0) {
          alert('Sepetiniz boş. Lütfen ürün ekleyin.');
          return;
      }

      cartItemsContainer.innerHTML = '';
      updateTotal();
      alert('Siparişiniz alınmıştır. Teşekkür ederiz!');
  }

  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-item')) {
          event.target.parentElement.remove();
          updateTotal();
      } else if (event.target.classList.contains('decrease-quantity')) {
          const quantityElement = event.target.nextElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          if (quantity > 1) {
              quantity--;
              quantityElement.innerText = quantity;
              updateTotal();
          }
      } else if (event.target.classList.contains('increase-quantity')) {
          const quantityElement = event.target.previousElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          quantity++;
          quantityElement.innerText = quantity;
          updateTotal();
      }
  });
});
