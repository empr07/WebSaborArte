function handleKeyPress(event) {
    if (event.keyCode === 13) {
        var searchValue = document.getElementById('search').value;
        sessionStorage.setItem("searchValue", searchValue)
        window.location.href = 'Busqueda.html'
    }
}