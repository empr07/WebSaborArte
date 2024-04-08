const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function login() {
	const email = document.getElementById("login_email").value;
	const password = document.getElementById("login_password").value;
	fetch("https://api-saboryarte.onrender.com/api/auth/login", {
		method: 'POST',
		mode: "cors",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ correo: email, contraseña: password }),

	}).then(response => {
		if (response.status !== 200) {
			document.getElementById('login_error').innerHTML = 'Credenciales incorrectas';
		}
		else {
			response.json().then(data => {
				localStorage.setItem("token", data.token)
				localStorage.setItem('admin', data.admin)
				if (data.admin) {
					window.location.href = '/Administrador.html'
				}
				else {
					window.location.href = '/Inicio.html'
				}
			})

		}
	}) // Analizar la respuesta como JSON
		.catch(error => console.error(error));
}



function register() {
	const name = document.getElementById("reg_name").value;
	const first_last_name = document.getElementById("reg_first_name").value;
	const second_last_name = document.getElementById("reg_second_name").value;
	const email = document.getElementById("reg_email").value;
	const password = document.getElementById("reg_password").value;
	fetch("https://api-saboryarte.onrender.com/api/auth/registro", {
		method: 'POST',
		mode: "cors",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			nombres: name, apellido_p: first_last_name,
			apellido_m: second_last_name,
			correo: email, contraseña: password,
			activo: true
		}),

	}).then(response => {
		if (response.status !== 201) {
			document.getElementById('reg_error').innerHTML = 'Error al registrarse';
		}
		else {
			response.json().then(data => {
				window.location.href = '/Login.html'
			})
		}
	}) // Analizar la respuesta como JSON
		.catch(error => console.error(error));
}