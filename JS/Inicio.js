let url = 'https://api-saboryarte.onrender.com/api/productos'
const container = document.querySelector('#contenedor-productos');
// const active = document.getElementById("selectStatus").value

fetch(url /* + '?activo=' + active*/)
    .then(response => response.json())
    .then(data => {
        data.length = 4
        data.forEach(producto => {
            const div = document.createElement('div');
            div.classList = 'item'
            div.innerHTML = `
                <img src="${producto.rutaimagen}" alt="Imagen ${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
            `

            container.appendChild(div);
        });
    })
    .catch(error => console.error(error));





