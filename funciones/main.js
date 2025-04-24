// convierte minutos a segundos
function convert(minutos) {
    return minutos * 60;
}

// recibe base y alto del triángulo y devuelve el área
function triArea(base, alto) {
    return (base * alto) / 2;
}

// dados 2 números, retorna true si la suma de ambos números es menor que 100. Caso contrario retorna false.
function lessThan100(a, b) {
    return a + b < 100;
}


// ...

function puntos(dobles, triples) {
    console.log((dobles * 2) + (triples * 3));
  }



// calcular el area de un cuadrado, círculo, rectángulo y triángulo, las cuales serán funciones independientes.
// empezando por un menú de opciones, el usuario selecciona la figura (seleccionando un número) y se le piden los datos necesarios para calcular el área.
// al final se muestra el resultado mediante un console.log
function areaCuadrado(lado) {
    return lado * lado;
}

function areaCirculo(radio) {
    return Math.PI * radio * radio;
}

function areaRectangulo(base, altura) {
    return base * altura;
}

function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}

function calcularArea() {
    const figura = prompt("Selecciona una figura: 1. Cuadrado, 2. Círculo, 3. Rectángulo, 4. Triángulo");

    let area;
    switch (figura) {
        case '1':
            const lado = parseFloat(prompt("Ingresa el lado del cuadrado:"));
            area = areaCuadrado(lado);
            break;
        case '2':
            const radio = parseFloat(prompt("Ingresa el radio del círculo:"));
            area = areaCirculo(radio);
            break;
        case '3':
            const baseRectangulo = parseFloat(prompt("Ingresa la base del rectángulo:"));
            const alturaRectangulo = parseFloat(prompt("Ingresa la altura del rectángulo:"));
            area = areaRectangulo(baseRectangulo, alturaRectangulo);
            break;
        case '4':
            const baseTriangulo = parseFloat(prompt("Ingresa la base del triángulo:"));
            const alturaTriangulo = parseFloat(prompt("Ingresa la altura del triángulo:"));
            area = areaTriangulo(baseTriangulo, alturaTriangulo);
            break;
        default:
            console.log("Opción no válida.");
            return;
    }

    console.log(`El área es: ${area}`);
}


