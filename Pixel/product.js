document.getElementById('add-to-cart').addEventListener('click', function() {
    var name = this.getAttribute('data-name');
    var price = parseFloat(this.getAttribute('data-price'));
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Sepetin güncellenmesini sağlayan bir fonksiyon çağır
    alert('Ürün sepete eklendi!');
});

function updateCart() {
    var cartItemsElement = document.getElementById('cart-items');
    var cartTotalElement = document.getElementById('cart-total');
    var cartEmptyMessage = document.getElementById('cart-empty-message');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItemsElement.innerHTML = '';
    var total = 0;
    cart.forEach(item => {
        var li = document.createElement('li');
        li.textContent = item.name + ' - ' + item.price + ' - ' + item.quantity;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = 'Toplam: $' + total.toFixed(2);

    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
    } else {
        cartEmptyMessage.style.display = 'none';
    }
}

updateCart(); // Sayfa yüklendiğinde sepeti güncelle
