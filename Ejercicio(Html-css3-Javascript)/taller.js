// Función para manejar el login y deslogeo
function manejarLogin() {
    const nombreGuardado = localStorage.getItem("nombreUsuario");

    if (nombreGuardado) {
        // Si hay un nombre guardado, elimina el nombre y cambia el botón a "Logearse"
        localStorage.removeItem("nombreUsuario");
        document.getElementById('name').textContent = "";
        document.getElementById('logearse').textContent = "Logearse";
    } else {
        // Si no hay un nombre guardado, pide al usuario su nombre
        const nombre = window.prompt("Antes de continuar, por favor ingresa tu nombre:");
        if (nombre) {
            localStorage.setItem("nombreUsuario", nombre);
            mostrarSaludo(nombre);
        } else {
            console.log("No se ingresó un nombre.");
        }
    }
}

// Función para mostrar el saludo y cambiar el botón
function mostrarSaludo(nombre) {
    document.getElementById('name').textContent = "Bienvenido/a de nuevo, " + nombre;
    document.getElementById('logearse').textContent = "Deslogearse";
}

// Carga inicial para ver si el usuario está logeado
const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) {
    mostrarSaludo(nombreGuardado);
}

// Evento de clic para el botón de logearse/deslogearse
document.getElementById('logearse').addEventListener("click", manejarLogin);

// Obtener productos de la API
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(productos => {
        const lista_productos = document.getElementById('lista_productos');
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
            <h2>${producto.title}</h2>
            <img src="${producto.image}" alt="${producto.title}">
            <button onClick="funCalcularPrecio(${producto.price},'${producto.title}')">Price: $ ${producto.price}</button>
            <p>Category: ${producto.category}</p>
            <p>Rating: ${producto.rating.rate}</p>
            `;
            lista_productos.appendChild(div);
        });
    });

let precios_guardado = [];
let total = 0;
let seleccionados = [];

// Función para calcular el precio
function funCalcularPrecio(price, title) {
    // Agregar el precio y el nombre del producto a los arrays
    precios_guardado.push(price);
    seleccionados.push(title);

    // Recalcular el total
    total = precios_guardado.reduce((acc, curr) => acc + curr, 0);

    // Actualizar la visualización de los productos seleccionados
    actualizar();
}

// Función para actualizar la vista
function actualizar() {
    // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    const tbody = document.getElementById('tabla').getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    // Mostrar los productos seleccionados en filas
    seleccionados.forEach((producto, index) => {
        const fila = generarFilaProducto(producto, precios_guardado[index]);
        tbody.appendChild(fila);
    });

    // Agregar una fila para el total al final de la tabla
    const filaTotal = document.createElement('tr');
    const celdaVacia = document.createElement('td');
    celdaVacia.colSpan = 2; // Combina dos celdas para que el total quede al final
    const celdaTotalTexto = document.createElement('td');
    celdaTotalTexto.textContent = "Total:";
    const celdaTotalValor = document.createElement('td');
    celdaTotalValor.textContent = "$" + total;
    
    filaTotal.appendChild(celdaVacia);
    filaTotal.appendChild(celdaTotalTexto);
    filaTotal.appendChild(celdaTotalValor);
    
    tbody.appendChild(filaTotal);
}

// Función para generar las filas de los productos
function generarFilaProducto(producto, precio) {
    const fila = document.createElement('tr');
    const columnanombre = document.createElement('td');
    const columnaprecio = document.createElement('td');
    const columnadescrp = document.createElement('td');
    const columnaeliminar = document.createElement('td');

    // Asignar valores a las celdas
    columnanombre.textContent = nombreGuardado;  // Nombre del usuario
    columnaprecio.textContent = "$" + precio;    // Precio del producto seleccionado
    columnadescrp.textContent = producto;        // Descripción del producto (nombre)

    // Añadir un botón para eliminar el producto
    columnaeliminar.innerHTML = `<button onClick="eliminarProducto('${producto}')">Eliminar</button>`;

    // Agregar las celdas a la fila
    fila.appendChild(columnanombre);
    fila.appendChild(columnaprecio);
    fila.appendChild(columnadescrp);
    fila.appendChild(columnaeliminar);

    return fila;
}

// Función para eliminar un producto
function eliminarProducto(producto) {
    // Eliminar producto de los arrays
    const index = seleccionados.indexOf(producto);
    if (index !== -1) {
        seleccionados.splice(index, 1);
        precios_guardado.splice(index, 1);

        // Recalcular el total
        total = precios_guardado.reduce((acc, curr) => acc + curr, 0);

        // Actualizar la visualización de los productos seleccionados
        actualizar();
    }
}
/*
// Mostrar el total en el botón de 'final'
document.getElementById('final').addEventListener("click", function () {
    document.getElementById('precio_f').innerHTML = total;
});
*/
// Mostrar el historial en el modal
var modal = document.getElementById("myModal");
var boton = document.getElementById("mostrar");
var span = document.getElementsByClassName("close")[0];

boton.onclick = function () {
    const tbody = document.getElementById('tabla').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevas filas

    seleccionados.forEach((producto, index) => {
        const fila = generarFilaProducto(producto, precios_guardado[index]);
        tbody.appendChild(fila);
    });

    // Agregar la fila total al final
    const filaTotal = document.createElement('tr');
    const celdaVacia = document.createElement('td');
    celdaVacia.colSpan = 2; // Combina dos celdas para que el total quede al final
    const celdaTotalTexto = document.createElement('td');
    celdaTotalTexto.textContent = "Total:";
    const celdaTotalValor = document.createElement('td');
    celdaTotalValor.textContent = "$" + total;

    filaTotal.appendChild(celdaVacia);
    filaTotal.appendChild(celdaTotalTexto);
    filaTotal.appendChild(celdaTotalValor);
    
    tbody.appendChild(filaTotal);

    // Abrir el modal
    modal.style.display = "block";
};

// Cerrar el modal al hacer clic en el botón de cerrar
span.onclick = function () {
    modal.style.display = "none";
}

// Cerrar el modal si el usuario hace clic fuera de la ventana modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
