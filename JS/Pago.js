const total = localStorage.getItem('total') || 0
let cartLs = JSON.parse(localStorage.getItem('cart')) || []
const subtotalInfo = document.getElementById('subtotal')
const totalInfo = document.getElementById('total')
const error = document.getElementById('error')
let metodoPago = ''

window.paypal.Buttons({

    createOrder: (data, actions) => {
        if (validarCampos()) {
            error.textContent = ''
            metodoPago = data.paymentSource == 'paypal' ? 'Paypal' : 'Tarjeta'
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total
                    }
                }]
            })
        }
        else {
            error.textContent = 'Complete todos los campos'
            return {}
        }

    },

    onApprove: (data, actions) => {
        realizarCompra()
        return actions.order.capture().then(function (orderData) {
            console.log('Capture Result', orderData, JSON.stringify(orderData, null, 2))
            // const transaction = orderData.purchase_units[0].payments.captures[0];
            // alert(`Transaction ${transaction.status}: ${transaction.id}`)
        })
    }

}).render("#paypal-button-container");

const v_required_metodo_pago = document.getElementById('v_required_metodo_pago');

const v_required_direccion = document.getElementById('v_required_direccion');
const v_minlength_direccion = document.getElementById('v_minlength_direccion');
const v_maxlength_direccion = document.getElementById('v_maxlength_direccion');

const v_required_pais = document.getElementById('v_required_pais');
const v_maxlength_pais = document.getElementById('v_maxlength_pais');

const v_required_nombres = document.getElementById('v_required_nombres');
const v_maxlength_nombres = document.getElementById('v_maxlength_nombres');

const v_required_apellidos = document.getElementById('v_required_apellidos');
const v_maxlength_apellidos = document.getElementById('v_maxlength_apellidos');

const v_required_telefono = document.getElementById('v_required_telefono');
const v_minlength_telefono = document.getElementById('v_minlength_telefono');
const v_maxlength_telefono = document.getElementById('v_maxlength_telefono');

const v_required_cp = document.getElementById('v_required_cp');
const v_maxlength_cp = document.getElementById('v_maxlength_cp');


const v_required_calles = document.getElementById('v_required_calles');
const v_maxlength_calles = document.getElementById('v_maxlength_calles');

const v_required_ciudad = document.getElementById('v_required_ciudad');
const v_maxlength_ciudad = document.getElementById('v_maxlength_ciudad');

const v_required_estado = document.getElementById('v_required_estado');
const v_maxlength_estado = document.getElementById('v_maxlength_estado');

const validaciones = [
    v_required_direccion, v_minlength_direccion, v_maxlength_direccion,
    v_required_pais, v_maxlength_pais,
    v_required_nombres, v_maxlength_nombres,
    v_required_apellidos, v_maxlength_apellidos,
    v_required_telefono, v_minlength_telefono, v_maxlength_telefono,
    v_required_cp, v_maxlength_cp,
    v_required_calles, v_maxlength_calles,
    v_required_ciudad, v_maxlength_ciudad,
    v_required_estado, v_maxlength_estado
]

subtotalInfo.textContent = '$' + total
totalInfo.textContent = '$' + total

function soloNumeros(event) {
    const charCode = event.key

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
}


function validarCampos() {
    // const numero_tarjeta = document.getElementById('numero_tarjeta').value
    // const nombre_titular = document.getElementById('nombre_titular').value
    // const fecha_vencimiento = document.getElementById('fecha_vencimiento').value
    // const cvv = document.getElementById('cvv').value
    const direccion = document.getElementById('direccion').value
    const pais = document.getElementById('pais').value
    const nombres = document.getElementById('nombres').value
    const apellidos = document.getElementById('apellidos').value
    const telefono = document.getElementById('telefono').value
    const cp = document.getElementById('cp').value
    const calles = document.getElementById('calles').value
    const ciudad = document.getElementById('ciudad').value
    const estado = document.getElementById('estado').value


    v_required_direccion.textContent = direccion == '' ? 'Este campo es obligatorio' : ''
    v_minlength_direccion.textContent = direccion.length < 10 ? 'Este campo requiere mínimo 10 caracteres' : ''
    v_maxlength_direccion.textContent = direccion.length > 250 ? 'Este campo requiere máximo 250 caracteres' : ''

    v_required_pais.textContent = pais == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_pais.textContent = pais.length > 50 ? 'Este campo requiere máximo 50 caracteres' : ''

    v_required_nombres.textContent = nombres == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_nombres.textContent = nombres.length > 50 ? 'Este campo requiere máximo 50 caracteres' : ''

    v_required_apellidos.textContent = apellidos == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_apellidos.textContent = apellidos.length > 50 ? 'Este campo requiere máximo 50 caracteres' : ''

    v_required_telefono.textContent = telefono == '' ? 'Este campo es obligatorio' : ''
    v_minlength_telefono.textContent = telefono.length < 10 ? 'Este campo requiere mínimo 10 digitos' : ''
    v_maxlength_telefono.textContent = telefono.length > 13 ? 'Este campo requiere máximo 13 digitos' : ''

    v_required_cp.textContent = cp == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_cp.textContent = cp.length > 5 ? 'Este campo requiere máximo 5 digitos' : ''

    v_required_calles.textContent = calles == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_calles.textContent = calles.length > 15 ? 'Este campo requiere máximo 15 caracteres' : ''

    v_required_ciudad.textContent = ciudad == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_ciudad.textContent = ciudad.length > 30 ? 'Este campo requiere máximo 30 caracteres' : ''

    v_required_estado.textContent = estado == '' ? 'Este campo es obligatorio' : ''
    v_maxlength_estado.textContent = estado.length > 30 ? 'Este campo requiere máximo 30 caracteres' : ''



    const hayAlgunError = validaciones.some(validacion => {
        return validacion.textContent !== ''
    })

    return !hayAlgunError;
}

function realizarCompra() {
    // if (validarCampos()) {
    error.textContent = ''
    const direccion = document.getElementById('direccion').value
    const pais = document.getElementById('pais').value
    const nombres = document.getElementById('nombres').value
    const apellidos = document.getElementById('apellidos').value
    const telefono = document.getElementById('telefono').value
    const cp = document.getElementById('cp').value
    const calles = document.getElementById('calles').value
    const ciudad = document.getElementById('ciudad').value
    const estado = document.getElementById('estado').value

    const date = new Date();
    const options = { timeZone: 'America/Mexico_City' };
    const localeDate = date.toLocaleString('es-MX', options);

    const adjustedLocaleDate = /^\d{2}/.test(localeDate) ? localeDate : '0' + localeDate;

    const day = adjustedLocaleDate.slice(0, 2);
    const month = adjustedLocaleDate.slice(3, 5);
    const year = adjustedLocaleDate.slice(6, 10);

    const output = year + '-' + month + '-' + day;
    

    fetch("https://api-saboryarte.onrender.com/api/comprasporusuario/", {
        method: 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            totalproducto: cartLs.length,
            total: total,
            fechacompra: output,
            detalles: cartLs,
            pago: {
                totalpagado: total,
                direccion: direccion,
                pais: pais,
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                cp: cp,
                calles: calles,
                ciudad: ciudad,
                estado: estado,
                metodo: metodoPago,
            }
        }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada con éxito',
                showConfirmButton: false,
                timer: 2000
            })
            setTimeout(() => {
                window.location.href = "../Inicio.html"
            }, "2500");
        }
        else if (response.status == 403) {
            window.location.href = '../Login.html'
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la compra',
                text: 'Intentelo más tarde',
                showConfirmButton: false,
                timer: 3000
            })
        }
    })
    // }
    // else {
    //     error.textContent = 'Complete todos los campos'
    // }
}

function metodoSeleccionado() {
    const radios_metodo = document.getElementsByName("metodo_pago");
    let radio_seleccionado;

    for (var i = 0; i < radios_metodo.length; i++) {
        if (radios_metodo[i].checked) {
            radio_seleccionado = radios_metodo[i];
            break;
        }
    }
    if (radio_seleccionado) {
        return radio_seleccionado.value
    }
    else {
        return ''
    }
}

// function cambiarMetodo(tipo) {
//     console.log(tipo)
//     const containerTarjeta = document.getElementById('container-tarjeta')

//     if (tipo === 'Tarjeta') {
//         containerTarjeta.innerHTML = `<strong>Datos de Tarjeta</strong><br>

//         <label for="numero_tarjeta">Número de Tarjeta:</label>
//         <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57"
//             name="numero_tarjeta" id="numero_tarjeta" required ><br>
//         <p class="validacion-error" id="v_required_numero_tarjeta"></p>
//         <p class="validacion-error" id="v_minlength_numero_tarjeta"></p>
//         <p class="validacion-error" id="v_maxlength_numero_tarjeta"></p>


//         <label for="nombre_titular">Nombre del Titular:</label>
//         <input type="text" onkeypress="return /[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(event.key);"
//             name="nombre_titular" id="nombre_titular" required ><br>
//         <p class="validacion-error" id="v_required_nombre_titular"></p>
//         <p class="validacion-error" id="v_minlength_nombre_titular"></p>
//         <p class="validacion-error" id="v_maxlength_nombre_titular"></p>



//         <label for="fecha_vencimiento">Fecha de Vencimiento:</label>
//         <input type="text"
//             onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 47"
//             required  name="fecha_vencimiento" id="fecha_vencimiento"><br>
//         <p class="validacion-error" id="v_required_fecha_vencimiento"></p>
//         <p class="validacion-error" id="v_minlength_fecha_vencimiento"></p>
//         <p class="validacion-error" id="v_maxlength_fecha_vencimiento"></p>

//         <label for="cvv">Código de Seguridad (CVV): </label>
//         <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required
//             minlength="3" maxlength="3" name="cvv" id="cvv">
//         <p class="validacion-error" id="v_required_cvv"></p>
//         <p class="validacion-error" id="v_minlength_cvv"></p>
//         <p class="validacion-error" id="v_maxlength_cvv"></p>
// `
//     }
//     else {
//         containerTarjeta.innerHTML = ``
//     }
// }






