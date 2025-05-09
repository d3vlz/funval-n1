let tabla = document.querySelector("#tabla-cuerpo");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((Response) => Response.json())
  .then((data) => {
      data.forEach((element) => {
        tabla.innerHTML += `<tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            ${element.name}
            </th>
            <td class="px-6 py-4">${element.phone}</td>
            <td class="px-6 py-4">${element.website}</td>
            <td class="px-6 py-4">${element.company.name}</td>
          </tr>`;
      });
  })
  .catch((error) => console.log(error));
