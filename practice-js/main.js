// 1 - Edad para votar
// Escribe un programa que pida una edad y diga si la persona puede votar (mayor o igual a 18 años).


// alert("Bienvenido");
// let edad = parseInt(prompt("¿Cuántos años tienes?"));

// if (edad >= 18) {
//   alert("Puedes votar");
// } else if (edad >= 0) {
//   alert("No puedes votar");
// } else {
//   alert("Información incorrecta");
// }


// 2 - Número positivo, negativo o cero
// Escribe un programa que determine si un número es positivo, negativo o cero.

// let contador = 0;

// while (true) {
//   let numero = parseFloat(prompt("Ingrese su número:"));

//   if (numero === 0) {
//     alert("Tu número es 0");
//     break;
//   } else if (numero > 0) {
//     alert("Tu número es positivo");
//     break;
//   } else if (numero < 0) {
//     alert("Tu número es negativo");
//     break;
//   } else {
//     alert("Información incorrecta");
//     contador++;
//     if (contador >= 3) {
//       alert("Intentos superados");
//       alert("Pruebe más tarde");
//       break;
//     }
//   }
// }


// 3 - Día de la semana
// Usa switch para mostrar qué día es según un número del 1 al 7.


// alert("Bienvenido");

// let dia = parseInt(prompt("Ingresa un número del 1 al 7"));

// switch (dia) {
//   case 1:
//     alert("Lunes");
//     break;
//   case 2:
//     alert("Martes");
//     break;
//   case 3:
//     alert("Miércoles");
//     break;
//   case 4:
//     alert("Jueves");
//     break;
//   case 5:
//     alert("Viernes");
//     break;
//   case 6:
//     alert("Sábado");
//     break;
//   case 7:
//     alert("Domingo");
//     break;
//   default:
//     alert("El número debe estar entre 1 y 7.");
// }



// 4 - Número par o impar
// Escribe un programa que determine si un número es par o impar.

// alert("Comprobar número par o impar");

// let numero = parseInt(prompt("Ingresa un número entero"));


// if (isNaN(numero)) {
//     alert("Entrada inválida. Ingresa un número válido.");
//   } else if (numero % 2 === 0) {
//     alert("El número es par");
//   } else {
//     alert("El número es impar");
//   }


// 5 - Notas escolares
// Según una nota del 0 al 20, muestra:
// 0-10: "Desaprobado", 11-13: "Regular", 14-17: "Bueno", 18-20: "Excelente"

// while (true) {
//     let nota = parseFloat(prompt("Ingrese su nota:"));
  
//     if (nota >= 18 && nota <= 20) {
//       alert("Excelente");
//       break;
//     } else if (nota >= 14 && nota < 18) {
//       alert("Bueno");
//       break;
//     } else if (nota >= 11 && nota < 14) {
//       alert("Regular");
//       break;
//     } else if (nota >= 0 && nota < 11) {
//       alert("Desaprobado");
//       break;
//     } else if (nota > 20 || nota < 0) {
//       alert("nota incorrecta, ingrese otro número");
//     } else {
//       alert("dato no válido, ingrese un número");
//     }
//   }
  
// 7 - Sumar los primeros 100 números
// Usa un bucle para sumar los números del 1 al 100.

let suma = 0;

for (let i = 1; i <= 100; i++) {
  suma += i;
}

alert("La suma de los primeros 100 números es: " + suma);

