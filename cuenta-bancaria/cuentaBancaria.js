/*

let saldo = 1000;
prompt("Bienvenido estimado");
let opcion = prompt(`Seleccione una opción:
    1. Consultar saldo
    2. Retirar dinero
    3. Depositar dinero
    4. Salir`);
while (opcion !== '4') {
    switch (opcion) {
        case '1':
            alert("Su saldo es: S/." + saldo);
            break;
        case '2':
            let retiro = parseFloat(prompt("Ingrese la cantidad a retirar:"));
            if (retiro > saldo) {
                alert("Fondos insuficientes.");
            } else {
                saldo -= retiro;
                alert("Retiro exitoso. Su nuevo saldo es: S/." + saldo);
            }
            break;
        case '3':
            let deposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));
            saldo += deposito;
            alert("Depósito exitoso. Su nuevo saldo es: S/." + saldo);
            break;
        default:
            alert("Opción no válida. Intente nuevamente.");
            break;
    }
    opcion = prompt(`Seleccione una opción:
        1. Consultar saldo
        2. Retirar dinero
        3. Depositar dinero
        4. Salir`);
}
alert("Gracias por usarme. Cuidado con los extorsionadores.");

*/



let saldo = 0;

// Mostrar menú y pedir # de opción
const mostrarMenu = function() {
  return prompt(`Seleccione una opción (solo escriba el número):
    1. Consultar saldo
    2. Retirar dinero
    3. Depositar dinero
    4. Salir`);
};

// Consultar el saldo
const consultarSaldo = function() {
  alert("Su saldo es: S/." + saldo);
};

// Retirar dinero
const retirarDinero = function() {
  let retiro = parseFloat(prompt("Ingrese la cantidad a retirar:"));
  if (retiro > saldo) {
    alert("Fondos insuficientes.");
  } else {
    saldo = saldo - retiro;
    alert("Retiro exitoso. Su nuevo saldo es: S/." + saldo);
  }
};

// Depositar dinero
const depositarDinero = function() {
  let deposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));
  saldo = saldo + deposito;
  alert("Depósito exitoso. Su nuevo saldo es: S/." + saldo);
};

// Para procesar la opción seleccionada
const procesarOpcion = function(opcion) {
  switch (opcion) {
    case '1':
      consultarSaldo();
      break;
    case '2':
      retirarDinero();
      break;
    case '3':
      depositarDinero();
      break;
    default:
      alert("Opción no válida. Intente nuevamente.");
      break;
  }
};

// Función principal
const ejecutarCajero = function() {
  alert("Bienvenido estimado");
  let opcion = mostrarMenu();
  while (opcion !== '4') {
    procesarOpcion(opcion);
    opcion = mostrarMenu();
  }
  alert("Gracias por usarme. Cuidado con los extorsionadores.");
};


// Iniciar el programa
ejecutarCajero();