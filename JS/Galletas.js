let url = 'https://api-saboryarte.onrender.com/api/productos'
const container = document.querySelector('#contenedor-productos');
let cartLs = JSON.parse(localStorage.getItem('cart')) || []
const productos = []


fetch(url + '?idcategoria=2' /* + '?activo=' + active*/)
    .then(response => response.json())
    .then(data => {

        data.forEach(producto => {
            productos.push(producto)
            refreshProducts();
        });
    })
    .catch(error => console.error(error));

function refreshProducts() {
    container.innerHTML = ''
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList = 'item'
        div.innerHTML = `
                    <img src="${producto.rutaimagen}" alt="Imagen ${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <button class="button-comprar" onclick="irDetalle(${producto.id})(${producto.id})">Comprar</button>
                `


        container.appendChild(div);
    })

}

function irDetalle(id) {
    const productoPorId = productos.find(p => p.id == id)
    localStorage.setItem('producto', JSON.stringify(productoPorId))
    window.location.href = '../Producto.html'
}



