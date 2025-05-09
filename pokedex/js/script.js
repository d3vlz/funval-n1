// js/script.js
const container = document.getElementById('pokemonContainer');
const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchButton');
const typeSelect = document.getElementById('typeSelect');
const filterBtn = document.getElementById('applyFilters');
const loadMoreBtn = document.getElementById('loadMore');
const pokemonCount = document.getElementById('pokemonCount');
const loadingIndicator = document.getElementById('loadingIndicator');

let allPokemon = [];
let totalPokemonCount = 0;
let offset = 0;
const limit = 20;
let isLoading = false;

// Obtener datos de un Pokémon
async function getPokemonData(idOrName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toString().toLowerCase()}`);
    if (!res.ok) throw new Error(`Pokémon ${idOrName} no encontrado`);
    return await res.json();
  } catch (error) {
    console.error(`Error obteniendo datos para ${idOrName}:`, error);
    return null;
  }
}

// Crear un elemento DOM a partir de una cadena HTML (función auxiliar)
function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

// Limpiar contenedor y agregar mensaje de "no resultados"
function showNoResultsMessage() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'col-span-full flex flex-col items-center justify-center py-16';
  
  const img = document.createElement('img');
  img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
  img.alt = 'Pokéball';
  img.className = 'w-16 h-16 mb-4 opacity-50';
  
  const p = document.createElement('p');
  p.className = 'text-xl text-gray-500 font-medium';
  p.textContent = 'No se encontraron Pokémon con estos filtros.';
  
  messageDiv.appendChild(img);
  messageDiv.appendChild(p);
  container.appendChild(messageDiv);
  
  pokemonCount.textContent = 'No hay resultados';
}

// Crear y mostrar mensaje de error
function showErrorMessage(title, message, buttonText, callback) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'col-span-full text-center text-poke-red py-16';
  
  const titleElem = document.createElement('p');
  titleElem.className = 'text-xl font-medium mb-4';
  titleElem.textContent = title;
  
  const messageElem = document.createElement('p');
  messageElem.textContent = message;
  
  const button = document.createElement('button');
  button.className = 'mt-4 px-4 py-2 bg-poke-red hover:bg-poke-dark-red text-white rounded-lg transition';
  button.textContent = buttonText;
  button.addEventListener('click', callback);
  
  errorDiv.appendChild(titleElem);
  errorDiv.appendChild(messageElem);
  errorDiv.appendChild(button);
  container.appendChild(errorDiv);
  
  pokemonCount.textContent = 'Error';
}

// Crear elemento de tipo de Pokémon
function createTypeElement(typeName) {
  const span = document.createElement('span');
  span.className = `type-tag type-${typeName}`;
  span.textContent = typeName;
  return span;
}

// Crear elemento de tarjeta de Pokémon
function createPokemonCard(p) {
  // Creamos el contenedor principal
  const cardContainer = document.createElement('div');
  cardContainer.className = 'perspective w-full h-96 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group';
  
  // El contenido interno que gira
  const content = document.createElement('div');
  content.id = `card-${p.id}`;
  content.className = 'content relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer';
  
  // Creamos el frente de la tarjeta
  const front = document.createElement('div');
  front.className = 'front absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-between';
  
  // Número de Pokémon
  const idDiv = document.createElement('div');
  idDiv.className = 'text-gray-500 font-bold text-right self-end';
  idDiv.textContent = `#${String(p.id).padStart(3, '0')}`;
  front.appendChild(idDiv);
  
  // Contenedor de imagen
  const imgContainer = document.createElement('div');
  imgContainer.className = 'flex-1 flex items-center justify-center';
  
  const img = document.createElement('img');
  img.src = p.sprites.other['official-artwork'].front_default || p.sprites.front_default;
  img.alt = p.name;
  img.className = 'w-40 h-40 object-contain transform hover:scale-110 transition-transform duration-300';
  imgContainer.appendChild(img);
  front.appendChild(imgContainer);
  
  // Información básica
  const infoDiv = document.createElement('div');
  infoDiv.className = 'w-full text-center';
  
  const name = document.createElement('h2');
  name.className = 'text-xl font-bold capitalize mb-2';
  name.textContent = p.name.replace('-', ' ');
  infoDiv.appendChild(name);
  
  // Tipos
  const typesDiv = document.createElement('div');
  typesDiv.className = 'flex flex-wrap justify-center gap-2 mb-4';
  p.types.forEach(t => {
    typesDiv.appendChild(createTypeElement(t.type.name));
  });
  infoDiv.appendChild(typesDiv);
  front.appendChild(infoDiv);
  
  // Mensaje para voltear
  const flipMessageFront = document.createElement('div');
  flipMessageFront.className = 'flip-message';
  flipMessageFront.textContent = 'Click para ver detalles';
  front.appendChild(flipMessageFront);
  
  // Creamos el reverso de la tarjeta
  const back = document.createElement('div');
  back.className = 'back absolute w-full h-full backface-hidden rotate-y-180 p-6 flex flex-col justify-between bg-gradient-to-br from-gray-50 to-gray-100';
  
  // Número de Pokémon (reverso)
  const idDivBack = document.createElement('div');
  idDivBack.className = 'text-gray-500 font-bold text-right';
  idDivBack.textContent = `#${String(p.id).padStart(3, '0')}`;
  back.appendChild(idDivBack);
  
  // Contenido principal del reverso
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'flex-1 flex flex-col justify-center space-y-3';
  
  // Nombre (reverso)
  const nameBack = document.createElement('h3');
  nameBack.className = 'text-xl font-bold capitalize text-center mb-2';
  nameBack.textContent = p.name.replace('-', ' ');
  detailsContainer.appendChild(nameBack);
  
  // Altura y peso
  const physicalDiv = document.createElement('div');
  physicalDiv.className = 'grid grid-cols-2 gap-2';
  
  // Altura
  const heightDiv = document.createElement('div');
  heightDiv.className = 'flex flex-col';
  
  const heightLabel = document.createElement('span');
  heightLabel.className = 'text-gray-500 text-sm';
  heightLabel.textContent = 'Altura';
  
  const heightValue = document.createElement('span');
  heightValue.className = 'font-medium';
  heightValue.textContent = `${(p.height/10).toFixed(1)} m`;
  
  heightDiv.appendChild(heightLabel);
  heightDiv.appendChild(heightValue);
  physicalDiv.appendChild(heightDiv);
  
  // Peso
  const weightDiv = document.createElement('div');
  weightDiv.className = 'flex flex-col';
  
  const weightLabel = document.createElement('span');
  weightLabel.className = 'text-gray-500 text-sm';
  weightLabel.textContent = 'Peso';
  
  const weightValue = document.createElement('span');
  weightValue.className = 'font-medium';
  weightValue.textContent = `${(p.weight/10).toFixed(1)} kg`;
  
  weightDiv.appendChild(weightLabel);
  weightDiv.appendChild(weightValue);
  physicalDiv.appendChild(weightDiv);
  
  detailsContainer.appendChild(physicalDiv);
  
  // Habilidades
  const abilitiesDiv = document.createElement('div');
  abilitiesDiv.className = 'flex flex-col';
  
  const abilitiesLabel = document.createElement('span');
  abilitiesLabel.className = 'text-gray-500 text-sm';
  abilitiesLabel.textContent = 'Habilidades';
  
  const abilitiesValue = document.createElement('span');
  abilitiesValue.className = 'font-medium capitalize';
  abilitiesValue.textContent = p.abilities.map(a => a.ability.name.replace('-', ' ')).join(', ');
  
  abilitiesDiv.appendChild(abilitiesLabel);
  abilitiesDiv.appendChild(abilitiesValue);
  detailsContainer.appendChild(abilitiesDiv);
  
  // Estadísticas
  const statsDiv = document.createElement('div');
  statsDiv.className = 'flex flex-col';
  
  const statsLabel = document.createElement('span');
  statsLabel.className = 'text-gray-500 text-sm';
  statsLabel.textContent = 'Estadísticas';
  
  const statsGrid = document.createElement('div');
  statsGrid.className = 'grid grid-cols-2 gap-x-2 gap-y-1 mt-1';
  
  p.stats.forEach(s => {
    const statName = document.createElement('div');
    statName.className = 'text-xs capitalize';
    statName.textContent = s.stat.name.replace('-', ' ');
    
    const statBarContainer = document.createElement('div');
    statBarContainer.className = 'flex items-center';
    
    const statBarBg = document.createElement('div');
    statBarBg.className = 'h-2 rounded-full bg-gray-200 w-full';
    
    const statBar = document.createElement('div');
    statBar.className = 'h-2 rounded-full bg-poke-red';
    statBar.style.width = `${Math.min(100, (s.base_stat / 150) * 100)}%`;
    
    const statValue = document.createElement('span');
    statValue.className = 'ml-1 text-xs';
    statValue.textContent = s.base_stat;
    
    statBarBg.appendChild(statBar);
    statBarContainer.appendChild(statBarBg);
    statBarContainer.appendChild(statValue);
    
    statsGrid.appendChild(statName);
    statsGrid.appendChild(statBarContainer);
  });
  
  statsDiv.appendChild(statsLabel);
  statsDiv.appendChild(statsGrid);
  detailsContainer.appendChild(statsDiv);
  
  back.appendChild(detailsContainer);
  
  // Mensaje para volver
  const flipMessageBack = document.createElement('div');
  flipMessageBack.className = 'flip-message';
  flipMessageBack.textContent = 'Click para volver';
  back.appendChild(flipMessageBack);
  
  // Añadimos frente y reverso al contenido
  content.appendChild(front);
  content.appendChild(back);
  
  // Añadimos el contenido al contenedor
  cardContainer.appendChild(content);
  
  return cardContainer;
}


// Renderizar lista de Pokémon
function renderList(list) {
  // Limpiar el contenedor
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  if (list.length === 0) {
    showNoResultsMessage();
    return;
  }
  
  // Crear y añadir cada tarjeta
  list.forEach(pokemon => {
    container.appendChild(createPokemonCard(pokemon));
  });
  
  pokemonCount.textContent = `Mostrando ${list.length} de ${totalPokemonCount} Pokémon`;
}

// Aplicar filtro por tipo
async function applyFilters() {
  const type = typeSelect.value;
  
  // Si no hay filtro, mostrar Pokémon cargados
  if (type === '') {
    renderList(allPokemon);
    loadMoreBtn.classList.remove('hidden');
    return;
  }
  
  showLoading(true);
  
  try {
    // Obtener Pokémon por tipo
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) throw new Error(`Error al obtener Pokémon de tipo ${type}`);
    
    const typeData = await res.json();
    const pokemonUrls = typeData.pokemon.map(p => p.pokemon.url);
    
    // Limitar a los primeros 50 para rendimiento
    const limitedUrls = pokemonUrls.slice(0, 50);
    
    // Obtener datos completos
    const promises = limitedUrls.map(url => 
      fetch(url).then(r => r.ok ? r.json() : null)
    );
    
    const results = await Promise.all(promises);
    const typePokemon = results.filter(p => p !== null);
    
    renderList(typePokemon);
    loadMoreBtn.classList.add('hidden');
  } catch (error) {
    console.error("Error aplicando filtros:", error);
    showErrorMessage(
      'Error al aplicar filtros', 
      error.message, 
      'Reiniciar filtros', 
      () => {
        resetFilters();
        renderList(allPokemon);
        loadMoreBtn.classList.remove('hidden');
      }
    );
  } finally {
    showLoading(false);
  }
}

// Buscar Pokémon por nombre
async function searchPokemon() {
  const name = input.value.toLowerCase().trim();
  if (!name) return;
  
  showLoading(true);
  
  try {
    const p = await getPokemonData(name);
    if (p) {
      // Limpiar el contenedor
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Mostrar solo este Pokémon
      container.appendChild(createPokemonCard(p));
      pokemonCount.textContent = `Resultado de búsqueda: 1 de ${totalPokemonCount} Pokémon`;
      loadMoreBtn.classList.add('hidden');
    } else {
      // Crear el mensaje de "no encontrado"
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      const messageDiv = document.createElement('div');
      messageDiv.className = 'col-span-full flex flex-col items-center justify-center py-16';
      
      const img = document.createElement('img');
      img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
      img.alt = 'Pokéball';
      img.className = 'w-16 h-16 mb-4 opacity-50';
      
      const p = document.createElement('p');
      p.className = 'text-xl text-poke-red font-medium';
      p.textContent = 'No se encontró ese Pokémon.';
      
      const button = document.createElement('button');
      button.id = 'backButton';
      button.className = 'mt-4 px-4 py-2 bg-poke-blue hover:opacity-90 text-white rounded-lg transition';
      button.textContent = 'Volver a todos los Pokémon';
      button.addEventListener('click', () => {
        resetFilters();
        renderList(allPokemon);
        loadMoreBtn.classList.remove('hidden');
      });
      
      messageDiv.appendChild(img);
      messageDiv.appendChild(p);
      messageDiv.appendChild(button);
      container.appendChild(messageDiv);
      
      pokemonCount.textContent = 'No hay resultados';
    }
  } catch (error) {
    const errorP = document.createElement('p');
    errorP.className = 'col-span-full text-center text-poke-red';
    errorP.textContent = `Error: ${error.message}`;
    
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(errorP);
    
    pokemonCount.textContent = 'Error en la búsqueda';
  } finally {
    showLoading(false);
  }
}

// Resetear filtros
function resetFilters() {
  typeSelect.value = '';
  input.value = '';
}

// Mostrar/ocultar indicador de carga
function showLoading(isShow) {
  isLoading = isShow;
  loadingIndicator.classList.toggle('hidden', !isShow);
  
  if (isShow) {
    // Limpiar contenedor
    while (loadingIndicator.firstChild) {
      loadingIndicator.removeChild(loadingIndicator.firstChild);
    }
    
    // Agregar spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    loadingIndicator.appendChild(spinner);
  }
}

// Cargar más Pokémon
async function loadMorePokemon() {
  if (isLoading) return;
  
  showLoading(true);
  offset += limit;
  
  try {
    const newPokemon = await loadPokemonBatch(offset, limit);
    allPokemon = [...allPokemon, ...newPokemon];
    renderList(allPokemon);
    
    // Ocultar botón si se alcanza límite
    if (offset >= 500 || newPokemon.length < limit) {
      loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.error("Error cargando más Pokémon:", error);
  } finally {
    showLoading(false);
  }
}

// Cargar lote de Pokémon
async function loadPokemonBatch(offset, limit) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error("Error obteniendo lista de Pokémon");
    
    const data = await res.json();
    const promises = data.results.map(p => getPokemonData(p.name));
    const results = await Promise.all(promises);
    return results.filter(p => p !== null);
  } catch (error) {
    console.error("Error cargando lote de Pokémon:", error);
    return [];
  }
}

// Cargar Pokémon iniciales
async function loadInitialPokemon() {
  showLoading(true);
  resetFilters();
  
  try {
    // Obtener total de Pokémon
    const countRes = await fetch('https://pokeapi.co/api/v2/pokemon-species');
    if (!countRes.ok) throw new Error("Error obteniendo conteo de Pokémon");
    
    const countData = await countRes.json();
    totalPokemonCount = countData.count;
    
    // Cargar primer lote
    const initialPokemon = await loadPokemonBatch(0, limit);
    allPokemon = initialPokemon;
    renderList(allPokemon);
    
    if (initialPokemon.length === limit) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    showErrorMessage(
      'No se pudieron cargar los Pokémon', 
      error.message, 
      'Reintentar', 
      loadInitialPokemon
    );
  } finally {
    showLoading(false);
  }
}

// Función para voltear la tarjeta
window.flipCard = id => {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.classList.toggle('rotate-y-180');
  }
};

// Eventos
searchBtn.addEventListener('click', searchPokemon);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchPokemon();
});
filterBtn.addEventListener('click', applyFilters);
loadMoreBtn.addEventListener('click', loadMorePokemon);

// Permitir clic en toda la tarjeta para voltearla
container.addEventListener('click', e => {
  const card = e.target.closest('.content');
  if (card && !e.target.closest('button')) {
    card.classList.toggle('rotate-y-180');
  }
});

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', loadInitialPokemon);