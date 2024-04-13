const isAdmin = localStorage.getItem('admin') || false
if (!isAdmin) {
    window.location.href = '../Inicio.html'
}

const id_producto = localStorage.getItem("id_producto") ? localStorage.getItem("id_producto") : 0

function onFileSelected() {
    var fileInput = document.getElementById('rutaimagen');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            const image = document.getElementById('image');
            image.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

fetch('https://api-saboryarte.onrender.com/api/categorias?activo=1')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idcategoria');

        // Iterar sobre los datos recibidos y agregarlos al select
        data.forEach(dato => {
            const opcion = document.createElement('option');
            opcion.value = dato.id;
            opcion.text = dato.descripcion;
            opcion.selected = false
            select.appendChild(opcion);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));

fetch('https://api-saboryarte.onrender.com/api/tamanios/')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idtamaño');

        // Iterar sobre los datos recibidos y agregarlos al select
        data.forEach(dato => {
            const opcion = document.createElement('option');
            opcion.value = dato.id;
            opcion.text = dato.tipo;
            opcion.selected = false
            select.appendChild(opcion);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));

fetch('https://api-saboryarte.onrender.com/api/sabores/')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idsabor');

        // Iterar sobre los datos recibidos y agregarlos al select
        data.forEach(dato => {
            const opcion = document.createElement('option');
            opcion.value = dato.id;
            opcion.text = dato.sabor;
            opcion.selected = false
            select.appendChild(opcion);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));



if (id_producto > 0) {
    fetch("https://api-saboryarte.onrender.com/api/productos/" + id_producto).then(response => response.json()).then(data => {
        document.getElementById("nombre").value = data.nombre
        document.getElementById("descripcion").value = data.descripcion
        document.getElementById("idcategoria").value = data.idcategoria
        document.getElementById("idtamaño").value = data.idtamaño
        document.getElementById("idsabor").value = data.idsabor
        document.getElementById("stock").value = data.stock
        document.getElementById("precio").value = data.precio
        document.getElementById("image").src = data.rutaimagen
        document.getElementById("activo").value = data.activo
        document.getElementById("fecha").value = data.fecharegistro.split('T')[0]
        document.getElementById("title").innerHTML = 'Editando Producto: ' + data.id
    })

}
else {
    document.getElementById("title").innerHTML = 'Nuevo Producto'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)

}





function save() {
    const idcategoria = Number(document.getElementById("idcategoria").value);
    const idsabor = Number(document.getElementById("idsabor").value);
    const idtamaño = Number(document.getElementById("idsabor").value);
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);
    const rutaimagen = document.getElementById("image").src;
    const activo = document.getElementById("activo").value;
    const fecha = document.getElementById("fecha").value;
    fetch(localStorage.getItem("id_producto") ? "https://api-saboryarte.onrender.com/api/productos/" + localStorage.getItem("id_producto") : "https://api-saboryarte.onrender.com/api/productos", {
        method: localStorage.getItem("id_producto") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            idcategoria: idcategoria,
            idsabor: idsabor,
            idtamaño: idtamaño,
            nombre: nombre, descripcion: descripcion,
            precio: precio, stock: stock, rutaimagen: rutaimagen,
            activo: activo, fecharegistro: fecha
        }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../TablaProductos.html"
        }
        else if (response.status >= 500) {
            document.getElementById('error').innerHTML = '¡Ocurrió un error, intentalo más tarde!';
        }
        else if (response.status == 422) {
            document.getElementById('error').innerHTML = '¡Completa todos los campos!';
        }
        else if (response.status == 403) {
            window.location.href = "../index.html"
        }
    }) // Analizar la respuesta como JSON
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}