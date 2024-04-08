let producto;
let cartLs = JSON.parse(localStorage.getItem('cart')) || []

try {
    producto = JSON.parse(localStorage.getItem('producto'))
}
catch (e) {
    window.location.href = '../Inicio.html'
}

const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
const tamaño = document.getElementById('tamaño')
const stock = document.getElementById('stock')
const sabor = document.getElementById('sabor')
const imagen = document.getElementById('imagen')



nombre.textContent = producto.nombre
descripcion.textContent = producto.descripcion
tamaño.textContent = producto.tamaño.tipo
stock.textContent = producto.stock
sabor.textContent = producto.sabore.sabor
imagen.src = producto.rutaimagen

refreshProducto()

function addToCartLS(id_producto) {
    const existeProductoEnCarrito = cartLs.some(e => e.id == id_producto)
    if (!existeProductoEnCarrito) {
        cartLs.push({ id: producto.id, cantidad: 1, nombre: producto.nombre, precio: producto.precio, rutaimagen: producto.rutaimagen, stock: producto.stock })
        localStorage.setItem('cart', JSON.stringify(cartLs))
    }
    refreshProducto();
}


function deleteToCartLS(id_producto) {
    cartLs = cartLs.filter(p => p.id != id_producto)
    localStorage.setItem('cart', JSON.stringify(cartLs))
    refreshProducto();
}

function refreshProducto() {
    const existeProductoEnCarrito = cartLs.some(e => e.id == producto.id)
    const container_boton = document.getElementById('container-boton')

    if (existeProductoEnCarrito) {
        container_boton.innerHTML = `
            <button style="color: bisque;" class="comprar" onclick="deleteToCartLS(${producto.id})">Quitar del carrito</button>
        `
    }
    else {
        container_boton.innerHTML = `
                <button style="color: bisque;" class="comprar" onclick="addToCartLS(${producto.id})">Agregar al carrito</button>
            `
    }
}



