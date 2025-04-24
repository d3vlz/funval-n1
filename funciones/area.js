function calcularArea() {
    let figura = prompt("Selecciona una figura:\n1. Cuadrado\n2. Círculo\n3. Rectángulo\n4. Triángulo");

    let area;
    switch (figura) {
        case '1':
            let lado = parseFloat(prompt("Ingresa el lado del cuadrado:"));
            area = areaCuadrado(lado);
            break;
        case '2':
            let radio = parseFloat(prompt("Ingresa el radio del círculo:"));
            area = areaCirculo(radio);
            break;
        case '3':
            let baseRectangulo = parseFloat(prompt("Ingresa la base del rectángulo:"));
            let alturaRectangulo = parseFloat(prompt("Ingresa la altura del rectángulo:"));
            area = areaRectangulo(baseRectangulo, alturaRectangulo);
            break;
        case '4':
            let baseTriangulo = parseFloat(prompt("Ingresa la base del triángulo:"));
            let alturaTriangulo = parseFloat(prompt("Ingresa la altura del triángulo:"));
            area = areaTriangulo(baseTriangulo, alturaTriangulo);
            break;
        default:
            alert("Opción no válida.");
            return;
    }

    alert(`El área es: ${area}`);
}

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
