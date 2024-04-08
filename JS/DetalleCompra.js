const id_compra = localStorage.getItem("id_compra") ? localStorage.getItem("id_compra") : 0
const token = localStorage.getItem("token")
const tablaDetalles = document.querySelector('#table-body-detalles');
const tablaPago = document.querySelector('#table-body-pago');


if (id_compra > 0) {
    fetch("https://api-saboryarte.onrender.com/api/compras/" + id_compra, {
        headers: {
            "Authorization": "token " + token
        }
    }).then(response => response.json()).then(data => {
        document.getElementById("title").innerHTML = 'Detalles de compra: ' + data.id
        document.getElementById("folio").innerHTML = data.id
        document.getElementById("fecha").innerHTML = data.fechacompra.slice(0, 10)
        document.getElementById("total").innerHTML = '$' + data.total

        document.getElementById("usuario").innerHTML = data.usuario.nombres + " " + data.usuario.apellido_p + " " + data.usuario.apellido_m
        document.getElementById("correo").innerHTML = data.usuario.correo


        data.detalle_compras.forEach(detalle => {
            const row = document.createElement('tr');
            row.innerHTML = `
      <td class="text-center">${detalle.producto.nombre}</td>
      <td class="text-center">${detalle.cantidad}</td>
      <td class="text-center">$${detalle.total}</td>
      
  </td>
      `;
            tablaDetalles.appendChild(row);
        });


        const row = document.createElement('tr');
        row.innerHTML = `
      <td class="text-center">${data.pago.metodo}</td>
      <td class="text-center">${data.pago.totalpagado}</td>
      <td class="text-center">${data.pago.nombres}</td>
      <td class="text-center">${data.pago.apellidos}</td>
      <td class="text-center">${data.pago.pais}</td>
      <td class="text-center">${data.pago.ciudad}</td>
      <td class="text-center">${data.pago.estado}</td>
      <td class="text-center">${data.pago.direccion}</td>
      <td class="text-center">${data.pago.calles}</td>
      <td class="text-center">${data.pago.cp}</td>

     
      
  </td>
      `;
        tablaPago.appendChild(row);


    })

}
else {
    window.location.href = "../sale.html"
}


