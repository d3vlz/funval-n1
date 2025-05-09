// Lista de productos
var productos = [
    { nombre: "Laptop", precio: 1200 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 50 },
    { nombre: "Monitor", precio: 300 },
    { nombre: "Silla Gamer", precio: 450 },
    { nombre: "Audífonos", precio: 80 },
    { nombre: "Webcam", precio: 60 },
    { nombre: "USB 128GB", precio: 30 },
    { nombre: "Impresora", precio: 200 },
    { nombre: "Tablet", precio: 500 }
];

// Ejercicio 1: forEach
document.getElementById('btn1').onclick = function() {
    document.getElementById('res1').innerHTML = '';
    
    productos.forEach(function(p) {
        document.getElementById('res1').innerHTML += "Nombre: " + p.nombre + ", Precio: $" + p.precio + "<br>";
        console.log("Nombre: " + p.nombre + ", Precio: $" + p.precio);
    });
}

// Ejercicio 2: map + includes
document.getElementById('btn2').onclick = function() {
    var resultado = document.getElementById('res2');
    resultado.innerHTML = '';
    
    // Crear array de nombres
    var nombres = productos.map(function(p) {
        return p.nombre;
    });
    
    resultado.innerHTML += "Productos: " + nombres.join(", ") + "<br>";
    
    // Verificar
    var buscar = document.getElementById('producto').value;
    if(buscar != "") {
        if(nombres.includes(buscar)) {
            resultado.innerHTML += `El producto "${buscar}" está disponible`;
        } else {
            resultado.innerHTML += `El producto "${buscar}" NO está disponible`;
        }
    } else {
        resultado.innerHTML += "Escribe un producto para buscar";
    }
}

// Ejercicio 3: map (descuento)
document.getElementById('btn3').onclick = function() {
    var resultado = document.getElementById('res3');
    resultado.innerHTML = '';
    
    var conDescuento = productos.map(function(p) {
        var descuento = p.precio * 0.1;
        var nuevo = p.precio - descuento;
        return {
            nombre: p.nombre,
            original: p.precio,
            descuento: nuevo
        };
    });
    
    for(var i=0; i<conDescuento.length; i++) {
        var p = conDescuento[i];
        resultado.innerHTML += p.nombre + ": $" + p.original + " → $" + p.descuento.toFixed(2) + "<br>";
    }
}

// Ejercicio 4: filter
document.getElementById('btn4').onclick = function() {
    var resultado = document.getElementById('res4');
    resultado.innerHTML = '';
    
    var baratos = productos.filter(function(p) {
        return p.precio < 100;
    });
    
    resultado.innerHTML += "Productos con precio menor a $100:<br>";
    for(var i=0; i<baratos.length; i++) {
        var p = baratos[i];
        resultado.innerHTML += p.nombre + ": $" + p.precio + "<br>";
    }
}

// Ejercicio 5: slice
document.getElementById('btn5').onclick = function() {
    var resultado = document.getElementById('res5');
    resultado.innerHTML = '';
    
    var primeros = productos.slice(0, 2);
    
    resultado.innerHTML += "Los primeros 2 productos son:<br>";
    primeros.forEach(function(p) {
        resultado.innerHTML += p.nombre + ": $" + p.precio + "<br>";
    });
}

// Ejercicio 6: sort
document.getElementById('btn6').onclick = function() {
    var resultado = document.getElementById('res6');
    resultado.innerHTML = '';
    
    // Crear copia
    var ordenados = JSON.parse(JSON.stringify(productos));
    ordenados.sort(function(a, b) {
        return a.precio - b.precio;
    });
    
    resultado.innerHTML += "Productos ordenados por precio:<br>";
    for(var i=0; i<ordenados.length; i++) {
        resultado.innerHTML += ordenados[i].nombre + ": $" + ordenados[i].precio + "<br>";
    }
}

// Ejercicio 7: reverse
document.getElementById('btn7').onclick = function() {
    var resultado = document.getElementById('res7');
    resultado.innerHTML = '';
    
    // Crear copia
    var invertidos = JSON.parse(JSON.stringify(productos));
    invertidos.reverse();
    
    resultado.innerHTML += "Productos en orden inverso:<br>";
    for(var i=0; i<invertidos.length; i++) {
        resultado.innerHTML += invertidos[i].nombre + ": $" + invertidos[i].precio + "<br>";
    }
}