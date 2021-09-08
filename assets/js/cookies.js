const botonAceptarCookies = document.getElementById('acept');
const avisoCookies = document.getElementById('cookies-box');
const fondoAvisoCookies = document.getElementById('fondo-aviso-cookies');

if(!localStorage.getItem('cookies-acepted')){
  avisoCookies.classList.add('activo');
  fondoAvisoCookies.classList.add('activo');
}

botonAceptarCookies.addEventListener('click', () => {
  avisoCookies.classList.remove('activo');
  fondoAvisoCookies.classList.remove('activo');

  localStorage.setItem('cookies-acepted', true);
})