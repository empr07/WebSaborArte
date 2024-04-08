fetch("https://api-saboryarte.onrender.com/api/productosmasvendidos",).then(response => response.json())
    .then(data => {
        const labels = data.map(producto => producto.nombre);
        const dataValues = data.map(producto => parseInt(producto.totalVendido));

        const colors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ];

        const ctx = document.getElementById('chart-productos').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Vendido',

                    data: dataValues,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Productos más vendidos',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }) // Analizar la respuesta como JSON
    .catch(error => console.error(error));

fetch("https://api-saboryarte.onrender.com/api/productosmenosvendidos",).then(response => response.json())
    .then(data => {
        const labels = data.map(producto => producto.nombre);
        const dataValues = data.map(producto => parseInt(producto.totalVendido));

        const colors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ];

        const ctx = document.getElementById('chart-menos-vendidos').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Vendido',

                    data: dataValues,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Productos menos vendidos',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }) // Analizar la respuesta como JSON
    .catch(error => console.error(error));

fetch("https://api-saboryarte.onrender.com/api/categoriasmasvendidas",).then(response => response.json())
    .then(data => {
        const labels = data.map(categoria => categoria.nombreCategoria);
        const dataValues = data.map(categoria => parseInt(categoria.totalVendido));

        const colors = [
            'rgba(255, 159, 64, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(255, 0, 0, 0.2)',
        ];

        const ctx = document.getElementById('chart-categorias').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'pie',  
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Vendido',
                    data: dataValues,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Categorias más vendidas',
                        font: {
                            size: 16
                        }
                    }
                },
            }
        });
    }) // Analizar la respuesta como JSON
    .catch(error => console.error(error));

function logout() {
    localStorage.removeItem('token')
    window.location.href = '../Inicio.html'
}