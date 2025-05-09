// js/script.js
const container     = document.getElementById('pokemonContainer');
const input         = document.getElementById('pokemonInput');
const searchBtn     = document.getElementById('searchButton');
const typeSelect    = document.getElementById('typeSelect');
const minHeight     = document.getElementById('minHeight');
const minWeight     = document.getElementById('minWeight');
const filterBtn     = document.getElementById('applyFilters');

let allPokemon = [];

async function getPokemonData(idOrName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return null;
  }
}

function renderCard(p) {
  const types     = p.types.map(t => t.type.name).join(', ');
  const abilities = p.abilities.map(a => a.ability.name).join(', ');
  return `
  <div class="perspective w-full h-80 bg-white rounded-xl shadow-lg overflow-hidden">
    <div id="card-${p.id}"
         class="content relative w-full h-full transition-transform duration-700 preserve-3d">
      <div class="front absolute w-full h-full backface-hidden p-4 flex flex-col items-center justify-center">
        <img src="${p.sprites.front_default}" alt="${p.name}" class="w-24 h-24 mb-2"/>
        <h2 class="text-xl font-bold capitalize">${p.name}</h2>
        <p class="text-sm text-gray-600">Tipo: ${types}</p>
        <button onclick="flipCard(${p.id})"
                class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition">
          Descripción
        </button>
      </div>
      <div class="back absolute w-full h-full backface-hidden rotate-y-180 p-4 flex flex-col justify-center">
        <h2 class="text-xl font-semibold mb-2">#${p.id}</h2>
        <p><strong>Altura:</strong> ${(p.height/10).toFixed(1)} m</p>
        <p><strong>Peso:</strong> ${(p.weight/10).toFixed(1)} kg</p>
        <p><strong>Habilidades:</strong> ${abilities}</p>
        <button onclick="flipCard(${p.id})"
                class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition">
          Volver
        </button>
      </div>
    </div>
  </div>`;
}

function renderList(list) {
  container.innerHTML = list.map(renderCard).join('');
}

function applyFilters() {
  const type = typeSelect.value;
  const h    = parseFloat(minHeight.value) || 0;
  const w    = parseFloat(minWeight.value) || 0;
  const filtered = allPokemon.filter(p =>
    (type === '' || p.types.some(t => t.type.name === type)) &&
    p.height/10 >= h &&
    p.weight/10 >= w
  );
  renderList(filtered);
}

searchBtn.addEventListener('click', async () => {
  const name = input.value.toLowerCase().trim();
  if (!name) return;
  container.innerHTML = `<p class="col-span-full text-center text-red-600">Buscando…</p>`;
  const p = await getPokemonData(name);
  container.innerHTML = p
    ? renderCard(p)
    : `<p class="col-span-full text-center text-red-600">No se encontró ese Pokémon.</p>`;
});

filterBtn.addEventListener('click', applyFilters);

async function loadInitialPokemon() {
  container.innerHTML = `<p class="col-span-full text-center">Cargando...</p>`;
  const promises = Array.from({ length: 100 }, (_, i) => getPokemonData(i+1));
  const results  = await Promise.all(promises);
  allPokemon = results.filter(p => p);
  renderList(allPokemon);
}

window.flipCard = id => {
  document.getElementById(`card-${id}`)
          .classList.toggle('rotate-y-180');
};

loadInitialPokemon();
