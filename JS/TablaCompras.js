const isAdmin = localStorage.getItem('admin') || false
if (!isAdmin) {
    window.location.href = '../Inicio.html'
}

let url = 'https://api-saboryarte.onrender.com/api/compras'
const tableBody = document.querySelector('#table-body');
// const active = document.getElementById("selectStatus").value

fetch(url, {
    headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
    },
} /* + '?activo=' + active*/)
    .then(response => response.json())
    .then(data => {

        data.forEach(compra => {
            let registrado = String(compra.fechacompra).slice(0, 10)
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td class="text-center">${compra.id}</td>
                    <td class="text-center">${compra.usuario.correo}</td>
                    <td class="text-center">${compra.totalproducto}</td>
                    <td class="text-center">$${compra.total}</td>
                    <td class="text-center">${registrado}</td>
                    <td class="text-center">
                                            <div class="flex" style="justify-content: space-evenly;">
                                                <a onclick="detalle(${compra.id})" class="btn btn-outline-warning p-1" title="Editar">
                                                    <i class="fa fa-brands fa-list p-2"></i>
                                                </a>
                                                
                                            </div>
                                        </td>
                    `;


            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));

function search() {
    tableBody.innerHTML = ""
    fetch(url, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(data => {
            var inputSearch = document.querySelector('#inputSearch');
            let textValue = inputSearch.value.toUpperCase()
            const tableBody = document.querySelector('#table-body');
            let filterData = []
            data.forEach(value => {
                let correoUpper = value.usuario.correo.toUpperCase()
                if (correoUpper.includes(textValue)) {
                    filterData.push(value)
                }
            }
            )
            filterData.forEach(compra => {
                let registrado = String(compra.fechacompra).slice(0, 10)
                const row = document.createElement('tr');
                row.innerHTML = `
                <td class="text-center">${compra.id}</td>
                <td class="text-center">${compra.usuario.correo}</td>
                <td class="text-center">${compra.totalproducto}</td>
                <td class="text-center">$${compra.total}</td>
                <td class="text-center">${registrado}</td>
                <td class="text-center">
                                        <div class="flex" style="justify-content: space-evenly;">
                                            <a onclick="detalle(${compra.id})" class="btn btn-outline-warning p-1" title="Editar">
                                                <i class="fa fa-brands fa-list p-2"></i>
                                            </a>
                                            
                                        </div>
                                    </td>
                `;


                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

function detalle(id_compra) {
    localStorage.setItem("id_compra", id_compra)
    window.location.href = 'DetalleCompra.html'
}


function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}