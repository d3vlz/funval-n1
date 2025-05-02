const boton = document.querySelector('#botonFiona');
const titulo = document.querySelector('h1');

boton.addEventListener('click', () => {
  if (boton.textContent === 'DIA') {
    boton.textContent = 'NOCHE';
    titulo.textContent = 'OGRA';
  } else {
    boton.textContent = 'DIA';
    titulo.textContent = 'FIONA';
  }
});
