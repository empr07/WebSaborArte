const isAdmin = localStorage.getItem('admin') || false
if (!isAdmin) {
    window.location.href = '../Inicio.html'
}

let url = 'https://api-saboryarte.onrender.com/api/audits'
const tableBody = document.querySelector('#table-body');
// const active = document.getElementById("selectStatus").value

fetch(url, {
    headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
    },
})
    .then(response => response.json())
    .then(data => {
        data.forEach(audit => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="text-center">${audit.user}</td>
                <td class="text-center">${audit.module}</td>
                <td class="text-center">${audit.description}</td>
                <td class="text-center">${audit.createdAt.slice(8, 10)}-${audit.createdAt.slice(5, 7)}-${audit.createdAt.slice(0, 4)}</td>
                <td class="text-center">${audit.createdAt.slice(11,16)}</td>
                 `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));


function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}