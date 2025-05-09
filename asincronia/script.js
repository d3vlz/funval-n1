
/*

function despertar(callback) {
    console.log("Despertando...");
    setTimeout(() => {
      console.log("Me desperté");
      callback();
    }, 2000);
  }
  function desayunar(callback) {
    console.log("Preparando desayuno...");
    setTimeout(() => {
      console.log("Desayuné");
      callback();
    }, 2500);
  }
  function irAlColegio() {
    console.log("Caminando al colegio...");
    setTimeout(() => {
      console.log("Llegué al colegio");
    }, 2000);
  }
  // Llamada en orden
  despertar(() => {
    desayunar(() => {
      irAlColegio();
    });
  });

  


  let traerDatos = new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          nombre: "kevin",
          edad: 28,
        },
        {
          nombre: "ana",
          edad: 20,
        },
        {
          nombre: "Cristian",
          edad: 30,
        },
      ]);
    }, 5000); // 2 segundos de retraso
  });
  traerDatos.then((item) => {
    console.log("Datos recibidos:");
    console.log(item);
    let objetos = item;
    objetos.forEach((element) => {
      console.log(element.nombre);
    });
  });

  */


/*

const promesa = new Promise((resolve, reject) => {
    const todoBien = true;
    if (todoBien) {
      resolve("todo chevere");
    } else {
      reject("algo se rompió");
    }
  });
  
  
  promesa
    .then(resultado => {
      console.log("Resultado:", resultado);
    })
    .catch(error => {
      console.log("Error:", error);
    });
  
    */

 /*

    function obtenerUsuarios() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const exito = true;
            if (exito) {
              resolve([
                { nombre: "Juan", edad: 25 },
                { nombre: "María", edad: 30 },
                { nombre: "Pedro", edad: 17 },
              ]);
            } else {
              reject("No se pudieron obtener los usuarios");
            }
          }, 1500);
        });
      }

    // muestrar solo los nombres de las personas mayores a 18 años
    function filtrarMayores(usuarios) {
        return usuarios.filter(usuario => usuario.edad > 18);
      }
    
      // Mostrar los nombres de los usuarios mayores a 18 años
      obtenerUsuarios()
        .then(usuarios => {
          const mayores = filtrarMayores(usuarios);
          console.log("Usuarios mayores de 18 años:");
          mayores.forEach(usuario => console.log(usuario.nombre));
        })
        .catch(error => {
          console.error(error);
        });




       
        obtenerUsuarios()
  .then(usuarios => {
    const mayores = usuarios.filter(u => u.edad > 18);
    const nombres = mayores.map(u => u.nombre);
    console.log("Mayores de 18:", nombres);
  })
  .catch(error => {
    console.error("Error:", error);
  });



function obtenerProductos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = true;
        if (exito) {
          resolve([
            { nombre: "Laptop", precio: 1200, stock: 5 },
            { nombre: "Celular", precio: 800, stock: 0 },
            { nombre: "Monitor", precio: 300, stock: 3 },
            { nombre: "Teclado", precio: 50, stock: 10 },
          ]);
        } else {
          reject("Error al obtener los productos del servidor.");
        }
      }, 2000);
    });
  }

// Filtrar los productos que tienen stock mayor que 0.
// Mostrar el nombre y el precio de esos productos.
    function ProductosConStock(productos) {
        return productos.filter(producto => producto.stock > 0);
    }
    
    obtenerProductos()
        .then(productos => {
        const productosConStock = ProductosConStock(productos);
        productosConStock.forEach(producto => {
            console.log(`Nombre: ${producto.nombre}, Precio: $${producto.precio}`);
        });
        })
        .catch(error => {
        console.error(error);
        });

*/

/*
let libros = [
    {
      titulo: "harry potter",
      año: 2002,
      autor: "JK ROWLING",
    },
    {
      titulo: "jesus el cristo",
      año: 1987,
      autor: "Talmage James",
    },
    {
      titulo: "la arrogancia fatal",
      año: 1988,
      autor: "Federick Haiek",
    },
  ];
  function fetchLibros() {
    return new Promise((resolve, reject) => {
      let cumplio = true;
      if (cumplio) {
        setTimeout(() => {
          resolve(libros);
        }, 7000);
      } else {
        reject("los libros no pudieron ser extraidos ");
      }
    });
  }
*/

/*
async function mostrarAutores() {
    const libros = await fetchLibros(); // si falla, lanza error y detiene todo
    const autores = libros.filter(libro => libro.año > 2000).map(libro => libro.autor);
    autores.forEach(autor => console.log(autor));
  }
  
mostrarAutores();
*/

/*
    async function mostrarAutores() {
        try {
          const libros = await fetchLibros();
          const autores = libros
            .filter(libro => libro.año > 2000)
            .map(libro => libro.autor);
          console.log("Autores de libros publicados después del año 2000:");
          autores.forEach(autor => console.log(autor));
        } catch (error) {
          console.error(error);
        }
    }
    mostrarAutores();
*/

const usuarios = [
    {
      id: 1,
      nombre: "Ana",
      edad: 28,
      librosFavoritos: ["1984", "Cien años de soledad"],
      historialCompras: [
        {
          fecha: "2024-02-12",
          libros: ["1984", "Rebelión en la granja"],
        },
        {
          fecha: "2025-01-01",
          libros: ["Cien años de soledad"],
        },
      ],
    },
    {
      id: 2,
      nombre: "Luis",
      edad: 34,
      librosFavoritos: ["La naranja mecánica"],
      historialCompras: [
        {
          fecha: "2023-12-10",
          libros: ["La naranja mecánica", "El extranjero"],
        },
      ],
    },
    {
      id: 3,
      nombre: "Carla",
      edad: 21,
      librosFavoritos: [],
      historialCompras: [],
    },
  ];
  function fetchUsuarios() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(usuarios);
      }, 1000);
    });
  }


  async function clienteFrecuente() {
    try {
      let usuarioCantidad = await fetchUsuarios();
      let frecuentes = usuarioCantidad.filter(
        (usuario) =>
             usuario.historialCompras[0].libros.length > 1 ||
             usuario.historialCompras.libros.length > 1
      );
      frecuentes.forEach((element) => {
        console.log(
          `El usuario de nombre ${element.nombre} ha comprado ${element.historialCompras.length} libros`
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  /* Mostrar usuarios con más de 1 compra y mostrar la cantidad de libros comprados x ese usuario
     Mostrar todos los libros comprados por un usuario
     Agregar un libro favorito a un usuario si no lo tiene
  */


      