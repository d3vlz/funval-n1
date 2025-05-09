// Obtener elementos del DOM
const selectFigura = document.getElementById('figura');
const campoCuadrado = document.getElementById('campo-cuadrado');
const campoRectangulo = document.getElementById('campo-rectangulo');
const campoTriangulo = document.getElementById('campo-triangulo');
const botonCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado');
const valorArea = document.getElementById('valor-area');
const divError = document.getElementById('error');
const mensajeError = document.getElementById('mensaje-error');

// Campos de entrada
const ladoCuadrado = document.getElementById('lado-cuadrado');
const baseRectangulo = document.getElementById('base-rectangulo');
const alturaRectangulo = document.getElementById('altura-rectangulo');
const baseTriangulo = document.getElementById('base-triangulo');
const alturaTriangulo = document.getElementById('altura-triangulo');

// Función para mostrar mensaje de error
function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    divError.classList.remove('hidden');
    divResultado.classList.add('hidden');
    
    // Ocultar el error después de 3 segundos
    setTimeout(function() {
        divError.classList.add('hidden');
    }, 3000);
}

// Función para cambiar los campos según la figura seleccionada
selectFigura.addEventListener('change', function() {
    // Ocultar todos los campos
    campoCuadrado.classList.add('hidden');
    campoRectangulo.classList.add('hidden');
    campoTriangulo.classList.add('hidden');
    divResultado.classList.add('hidden');
    divError.classList.add('hidden');
    
    // Habilitar/deshabilitar el botón de calcular
    if (selectFigura.value === '') {
        botonCalcular.disabled = true;
    } else {
        botonCalcular.disabled = false;
    }
    
    // Mostrar los campos correspondientes
    if (selectFigura.value === 'cuadrado') {
        campoCuadrado.classList.remove('hidden');
    } else if (selectFigura.value === 'rectangulo') {
        campoRectangulo.classList.remove('hidden');
    } else if (selectFigura.value === 'triangulo') {
        campoTriangulo.classList.remove('hidden');
    }
});

// Función para validar un número
function esNumeroValido(valor, nombreCampo) {
    if (valor === '' || isNaN(valor)) {
        mostrarError(`Por favor, ingresa un número válido para el campo ${nombreCampo}.`);
        return false;
    }
    
    if (valor <= 0) {
        mostrarError(`El ${nombreCampo} debe ser mayor que cero.`);
        return false;
    }
    
    return true;
}

// Función para calcular el área
botonCalcular.addEventListener('click', function() {
    divError.classList.add('hidden');
    
    let area = 0;
    
    // Calcular según la figura seleccionada
    if (selectFigura.value === 'cuadrado') {
        const lado = parseFloat(ladoCuadrado.value);
        if (!esNumeroValido(lado, 'lado')) return;
        
        // Área del cuadrado = lado * lado
        area = lado * lado;
    } 
    else if (selectFigura.value === 'rectangulo') {
        const base = parseFloat(baseRectangulo.value);
        const altura = parseFloat(alturaRectangulo.value);
        
        if (!esNumeroValido(base, 'base')) return;
        if (!esNumeroValido(altura, 'altura')) return;
        
        // Área del rectángulo = base * altura
        area = base * altura;
    } 
    else if (selectFigura.value === 'triangulo') {
        const base = parseFloat(baseTriangulo.value);
        const altura = parseFloat(alturaTriangulo.value);
        
        if (!esNumeroValido(base, 'base')) return;
        if (!esNumeroValido(altura, 'altura')) return;
        
        // Área del triángulo = (base * altura) / 2
        area = (base * altura) / 2;
    }
    
    // Mostrar el resultado
    valorArea.textContent = area.toFixed(2) + ' unidades²';
    divResultado.classList.remove('hidden');
});