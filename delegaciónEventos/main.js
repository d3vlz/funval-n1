// Datos iniciales para la tabla
const datos = [
    { nombre: "Kevin", celular: "123456", pais: "MEXICO" },
    { nombre: "Gino", celular: "98765432", pais: "CHILE" }
];

// Seleccionamos el body para crear la tabla
const body = document.querySelector('body');

// Creamos la tabla
const tabla = document.createElement('table');
tabla.className = 'w-full border-collapse'; 

// Creamos el encabezado de la tabla
const thead = document.createElement('thead');
const encabezados = ["nombre", "celular", "pais", "ACCIONES"];

// Agregamos las celdas de encabezado
encabezados.forEach(encabezado => {
    const th = document.createElement('th');
    th.className = 'border p-2 text-left';
    th.textContent = encabezado;
    thead.appendChild(th);
});

// Agregamos el encabezado a la tabla
tabla.appendChild(thead);

// Creamos el cuerpo de la tabla
const tbody = document.createElement('tbody');

// Función para crear filas
function crearFilas(datos) {
    // Limpiamos el cuerpo de la tabla primero
    tbody.innerHTML = '';
    
    // Creamos cada fila con sus datos
    datos.forEach(persona => {
        const tr = document.createElement('tr');
        
        // Agregamos cada celda con la información
        Object.values(persona).forEach(valor => {
            const td = document.createElement('td');
            td.className = 'border p-2';
            td.textContent = valor;
            tr.appendChild(td);
        });
        
        // Agregamos la celda con el botón eliminar
        const tdAccion = document.createElement('td');
        tdAccion.className = 'border p-2';
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'border px-2 py-1';
        botonEliminar.textContent = 'eliminar';
        
        // Añadimos el evento click al botón para eliminar la fila
        botonEliminar.addEventListener('click', function() {
            tr.remove(); // Esto elimina la fila completa
        });
        
        tdAccion.appendChild(botonEliminar);
        tr.appendChild(tdAccion);
        
        // Añadimos la fila al cuerpo de la tabla
        tbody.appendChild(tr);
    });
}

// Llamamos a la función para crear las filas iniciales
crearFilas(datos);

// Agregamos el cuerpo a la tabla
tabla.appendChild(tbody);

// Creamos un div contenedor para la tabla
const container = document.createElement('div');
container.className = 'container mx-auto p-4';
container.appendChild(tabla);

// Limpiamos el body y agregamos el contenedor
body.innerHTML = '';
body.appendChild(container);