function calculadora() {
    alert("Bienvenido a la calculadora, seleccione una opción");

    let operacion = prompt(`¿Qué operación desea realizar?
Para sumar ingrese --> 1
Para restar ingrese --> 2
Para multiplicación ingrese --> 3
Para división ingrese --> 4`);

    let num1 = parseFloat(prompt("Ingrese el primer número:"));
    let num2 = parseFloat(prompt("Ingrese el segundo número:"));

    switch (operacion) {
        case "1":
            alert("El resultado de la suma es: " + suma(num1, num2));
            break;
        case "2":
            alert("El resultado de la resta es: " + resta(num1, num2));
            break;
        case "3":
            alert("El resultado de la multiplicación es: " + multiplicacion(num1, num2));
            break;
        case "4":
            if (num2 !== 0) {
                alert("El resultado de la división es: " + division(num1, num2));
            } else {
                alert("Error: No se puede dividir entre cero.");
            }
            break;
        default:
            alert("Operación no válida. Por favor, seleccione una operación válida.");
    }
    
}

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}
