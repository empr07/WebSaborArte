const isAdmin = localStorage.getItem('admin') || false
if (!isAdmin) {
    window.location.href = '../Inicio.html'
}

let url = 'https://api-saboryarte.onrender.com/api/productos'
const tableBody = document.querySelector('#table-body');
// const active = document.getElementById("selectStatus").value

fetch(url /* + '?activo=' + active*/)
    .then(response => response.json())
    .then(data => {

        data.forEach(producto => {
            let registrado = String(producto.fecharegistro).slice(0, 10)
            let actualizado = producto.updatedAt != null ? String(producto.updatedAt).slice(0, 10) : "Sin actualización"
            let activo = producto.activo ? "Activo" : "Inactivo"
            const row = document.createElement('tr');
            if (producto.activo == 1) {
                row.innerHTML = `
                    <td class="text-center">${producto.id}</td>
                    <td class="text-center">${producto.nombre}</td>
                    <td class="text-center">${producto.categoria.descripcion}</td>
                    <td class="text-center">${producto.tamaño.tipo}</td>
                    <td class="text-center">$${producto.precio}</td>
                    <td class="text-center">${producto.stock}</td>
                    <td class="text-center">${activo}</td>
                    <td class="text-center">${registrado}</td>
                    <td class="text-center">${actualizado}</td>
                    <td class="text-center">
                                            <div class="flex" style="justify-content: space-evenly;">
                                                <a onclick="editar(${producto.id})" class="btn btn-outline-primary p-1" title="Editar">
                                                    <i class="fa fa-brands fa-pencil p-2"></i>
                                                </a>
                                                <a onclick="darbaja(${producto.id})" class="btn btn-outline-danger p-1" title="Dar Baja">
                                                    <i class="fa fa-brands fa-arrow-down p-2"></i>
                                                </a>
                                            </div>
                                        </td>
                    `;
            }
            else {
                row.innerHTML = `
                <td class="text-center">${producto.id}</td>
                <td class="text-center">${producto.nombre}</td>
                <td class="text-center">${producto.categoria.descripcion}</td>
                <td class="text-center">${producto.tamaño.tipo}</td>
                <td class="text-center">$${producto.precio}</td>
                <td class="text-center">${producto.stock}</td>
                 <td class="text-center">${activo}</td>
                 <td class="text-center">${registrado}</td>
                 <td class="text-center">${actualizado}</td>
                    <td class="text-center">
                                         <div class="flex" style="justify-content: space-evenly;">
                                             <a onclick="editar(${producto.id})" class="btn btn-outline-primary p-1" title="Editar">
                                                 <i class="fa fa-brands fa-pencil p-2"></i>
                                             </a>
                                         </div>
                                        </td>
                 `;
            }

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));

function search() {
    tableBody.innerHTML = ""
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var inputSearch = document.querySelector('#inputSearch');
            let textValue = inputSearch.value.toUpperCase()
            const tableBody = document.querySelector('#table-body');
            let filterData = []
            data.forEach(value => {
                let nombreUpper = value.nombre.toUpperCase()
                if (nombreUpper.includes(textValue)) {
                    filterData.push(value)
                }
            }
            )
            filterData.forEach(producto => {
                let registrado = String(producto.fecharegistro).slice(0, 10)
                let actualizado = producto.updatedAt != null ? String(producto.updatedAt).slice(0, 10) : "Sin actualización"
                let activo = producto.activo ? "Activo" : "Inactivo"
                const row = document.createElement('tr');
                if (producto.activo == 1) {
                    row.innerHTML = `
                                    <td class="text-center">${producto.id}</td>
                                    <td class="text-center">${producto.nombre}</td>
                                    <td class="text-center">${producto.categoria.descripcion}</td>
                                    <td class="text-center">${producto.tamaño.tipo}</td>
                                    <td class="text-center">$${producto.precio}</td>
                                    <td class="text-center">${producto.stock}</td>
                                    <td class="text-center">${activo}</td>
                                    <td class="text-center">${registrado}</td>
                                    <td class="text-center">${actualizado}</td>
                                    <td class="text-center">
                                    <div class="flex" style="justify-content: space-evenly;">
                                        <a onclick="editar(${producto.id})" class="btn btn-outline-primary p-1" title="Editar">
                                            <i class="fa fa-brands fa-pencil p-2"></i>
                                        </a>
                                        <a onclick="darbaja(${producto.id})" class="btn btn-outline-danger p-1" title="Dar Baja">
                                            <i class="fa fa-brands fa-arrow-down p-2"></i>
                                        </a>
                                    </div>
                                </td>
                        `;
                }
                else {
                    row.innerHTML = `
                                    <td class="text-center">${producto.id}</td>
                                    <td class="text-center">${producto.nombre}</td>
                                    <td class="text-center">${producto.categoria.descripcion}</td>
                                    <td class="text-center">${producto.tamaño.tipo}</td>
                                    <td class="text-center">$${producto.precio}</td>
                                    <td class="text-center">${producto.stock}</td>
                                    <td class="text-center">${activo}</td>
                                    <td class="text-center">${registrado}</td>
                                    <td class="text-center">${actualizado}</td>
                                    <td class="text-center">
                                 <div class="flex" style="justify-content: space-evenly;">
                                        <a onclick="editar(${producto.id})" class="btn btn-outline-primary p-1" title="Editar">
                                         <i class="fa fa-brands fa-pencil p-2"></i>
                                     </a>
                                    </div>
                             </td>
                        `;
                }

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

function editar(id_producto) {
    localStorage.setItem("id_producto", id_producto)
    window.location.href = 'CrearProducto.html'
}

function crear() {
    localStorage.removeItem("id_producto")
    window.location.href = 'CrearProducto.html'
}



function darbaja(id_producto) {
    Swal.fire({
        focusConfirm: false,
        title: '¿Estas seguro de realizar esta acción?',
        text: '¡El producto ' + id_producto + ' será dado de baja!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D33',
        cancelButtonColor: '#C0C0C0',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Dar de Baja!',

    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url + '/' + id_producto, {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ activo: 0 }),

            }).then(response => {
                if (response.status == 200 || response.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Acción realizada con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.search();

                }
                else if (response.status == 403) {
                    window.location.href = "../index.html"
                }
                else if (response.status >= 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al realizar la acción',
                        text: 'Intentelo más tarde',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        }
    })
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}