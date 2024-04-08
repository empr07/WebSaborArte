let url = 'https://api-saboryarte.onrender.com/api/auth/datosusuario'

if (!localStorage.getItem('token')) {
    window.location.href = 'Login.html'
}


fetch(url, {
    method: 'GET',
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'token ' + localStorage.getItem('token')
    },

}).then(response => response.json())
    .then(data => {
        const name = document.getElementById('nombre')
        const apellidos = document.getElementById('apellidos')
        const email = document.getElementById('email')

        name.textContent = data.nombres
        apellidos.textContent = data.apellido_p + ' ' + data.apellido_m
        email.textContent = data.correo

    })

const containerBotones = document.getElementById('container-botones')
const isAdmin = localStorage.getItem('admin') || false

console.log(isAdmin)


if (isAdmin.toString() == 'true') {
    containerBotones.innerHTML = `
    <button
    style="background-color: white; border: 1px #FF4B2B solid; color: #FF4B2B; height: 40px; width: 50%; cursor: pointer;"
    class="boton-pagar" onclick="panelAdmin()">Ir al panel de administrador</button>
    <br>
    <br>
    <button
    style="background-color: #FF4B2B; height: 40px; width: 50%; cursor: pointer;"
    class="boton-pagar" onclick="logout()">Cerrar sesión</button>`
}
else if (localStorage.getItem('token')) {
    containerBotones.innerHTML = `
    <button
    style="background-color: #FF4B2B; height: 40px; width: 50%; cursor: pointer;"
    class="boton-pagar" onclick="logout()">Cerrar sesión</button>`
}

function panelAdmin() {
    window.location.href = 'Panel.html'
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}