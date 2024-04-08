// Función para agregar un elemento al carrito
let cartLs = JSON.parse(localStorage.getItem('cart')) || []
const cartItems = document.getElementById('cart-items');
const buttonSale = document.getElementById('button-comprar')
let total = 0


function addToCart(id, productName, cantidad, price, imageUrl) {

    // Crear un elemento de lista para el carrito
    const listItem = document.createElement('li');
    listItem.className = 'cart-item';

    // Agregar imagen del producto
    const productImage = document.createElement('img');
    productImage.src = imageUrl; // Especifica la ruta correcta de la imagen
    productImage.className = 'product-image';
    listItem.appendChild(productImage);

    // Agregar detalles del producto
    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    productDetails.innerHTML = `${productName} - $${price}`;
    listItem.appendChild(productDetails);

    // Agregar controles de cantidad
    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'product-quantity';

    const decreaseButton = document.createElement('span');
    decreaseButton.className = 'quantity-button';
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', function () {
        const producto = cartLs.find(e => e.id == id)
        if (producto.cantidad > 1) {
            producto.cantidad -= 1
            localStorage.setItem('cart', JSON.stringify(cartLs))
            refreshCartDiv()
        }
    })
    quantityDiv.appendChild(decreaseButton);

    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = cantidad;
    quantityDiv.appendChild(quantitySpan);

    const increaseButton = document.createElement('span');
    increaseButton.className = 'quantity-button';
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', function () {
        const producto = cartLs.find(e => e.id == id)
        if (producto.cantidad + 1 <= producto.stock) {
            producto.cantidad += 1
            localStorage.setItem('cart', JSON.stringify(cartLs))
            refreshCartDiv()
        }

    })
    quantityDiv.appendChild(increaseButton);

    listItem.appendChild(quantityDiv);

    // Agregar el elemento al carrito
    cartItems.appendChild(listItem);

    // Calcular el total

}

refreshCartDiv()


function refreshCartDiv() {
    cartItems.innerHTML = ''
    cartLs.forEach(producto => {
        addToCart(producto.id, producto.nombre, producto.cantidad, producto.precio, producto.rutaimagen,); // Asegúrate de tener la imagen correcta en la carpeta IMG
    });
    calcularTotal()
    if (cartLs.length > 0) {
        buttonSale.disabled = false
    }
    else {
        buttonSale.disabled = true
    }
}

function calcularTotal() {
    const totalElement = document.getElementById('total');
    total = 0
    cartLs.forEach(producto => {
        total += Number(producto.cantidad) * Number(producto.precio)
    });
    totalElement.textContent = total;
}

function comprar() {
    const token = localStorage.getItem('token') || null
    if (token != null) {
        localStorage.setItem('total', total)
        window.location.href = 'MetodoPago.html'
    }
    else {
        window.location.href = 'Login.html'

    }

}

