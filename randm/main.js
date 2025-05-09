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
<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style="text-decoration:none" h-90 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${element.image}" alt="">
<div class="flex flex-col justify-between p-4 leading-normal">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.name}</h5>
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
    fetch(`https://rickandmortyapi.com/api/character/?${input1.value}`)
      .then((response) => response.json())
      .then((data) => {
        contenedor.innerHTML = "";
        data.results.forEach((element) => {});
      });
  }
});