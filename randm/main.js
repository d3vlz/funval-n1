let input1 = document.querySelector("#inputSearch");
let contenedor = document.querySelector(".card-container");

async function traerTodos() {
  let respuesta = await fetch("https://rickandmortyapi.com/api/character");
  let data = await respuesta.json();
  let personjes = data.results;
  console.log(personjes);
  contenedor.innerHTML = "";
  personjes.forEach((element) => {
    contenedor.innerHTML += `
<a href="#" class="flex flex-col w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style="text-decoration:none">
  <div class="w-full overflow-hidden" style="height: 200px;">
    <img class="w-full h-full object-cover" src="${element.image}" alt="${element.name}">
  </div>
  <div class="flex flex-col justify-between p-4 leading-normal flex-grow">
    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">${element.name}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.status} - ${element.species}</p>
  </div>
</a>
`;
  });
}

traerTodos();

input1.addEventListener("input", () => {
  if (input1.value === "") {
    traerTodos();
  } else {
    fetch(`https://rickandmortyapi.com/api/character/?name=${input1.value}`)
      .then((response) => response.json())
      .then((data) => {
        contenedor.innerHTML = "";
        if (data.results && data.results.length > 0) {
          data.results.forEach((element) => {
            contenedor.innerHTML += `
<a href="#" class="flex flex-col w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style="text-decoration:none">
  <div class="w-full overflow-hidden" style="height: 200px;">
    <img class="w-full h-full object-cover" src="${element.image}" alt="${element.name}">
  </div>
  <div class="flex flex-col justify-between p-4 leading-normal flex-grow">
    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">${element.name}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.status} - ${element.species}</p>
  </div>
</a>
`;
          });
        } else {
          contenedor.innerHTML = "<p>No se encontraron resultados</p>";
        }
      })
      .catch(error => {
        console.error("Error:", error);
        contenedor.innerHTML = "<p>Error al buscar. Intenta con otro término.</p>";
      });
  }
});