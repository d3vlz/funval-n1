const usuarios = [
    { id: 1, nombre: "Ana", roles: ["admin"] },
    { id: 2, nombre: "Gino", roles: ["user"] },
    { id: 3, nombre: "Cristian", roles: ["admin", "user"] },
  ];
  
  // NO PUEDEN MODIFICAR EL ARRAY USUARIOS
  // NO PUEDEN USAR CICLO FOR, SI SE PODRÍA USAR FOREACH, MAP, FILTER
  // NO PUEDEN MODIFICAR LOS OBJETOS DENTRO DEL ARRAY USUARIOS
  // LA RESPUESTA SE DA DENTRO DE UNA FUNCIÓN QUE RECIBA EL ARRAY
  
  /*
    - FILTRAR A TODOS LOS USUARIOS DE TIPO ADMIN
    - A CADA OBJETO LE AGREGAN UNA LLAVE Q SE LLAMA CORREO NOMBRE*@GMAIL.COM   EJEMPLO:ANA@GMAIL.COM
      MOSTRAR DEL PRIMER ELEMENTO LAS LLAVES CORREO Y NOMBRE USANDO DESESTRUCTURACION DE ARRAYS Y OBJETOS
  */

const admins = usuarios.filter(usr => usr.roles.indexOf("admin") !== -1);
const adminsConCorreo = admins.map(usr => ({
  nombre: usr.nombre,
  correo: usr.nombre + "@gmail.com"
}));
const [ { nombre, correo } ] = adminsConCorreo;
console.log("Nombre:", nombre);
console.log("Correo:", correo);
