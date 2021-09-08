function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    // Navbar
    var itemsNavbar = document.getElementById('items-nav');
    itemsNavbar.innerHTML = `
          <li class="nav-item">
            <a class="nav-link" href="complements/dashboard.html">
              <i class="now-ui-icons business_chart-pie-36"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onclick="logout()" style="cursor: pointer;">
              <i class="now-ui-icons arrows-1_share-66"></i>
              <p>Cerrar Sesión</p>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" data-toggle="dropdown">
              <i class="now-ui-icons design_app"></i>
              <p>Componentes</p>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink1">
              <a class="dropdown-item" href="./index.html">
                <i class="now-ui-icons travel_info"></i> Acerca de Nosotros
              </a>
              <a class="dropdown-item" target="_blank" href="docs/documentacion-minnercrypto.pdf">
                <i class="now-ui-icons files_paper"></i> Documentación
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="Siguenos en Twitter" data-placement="bottom" href="https://www.twitter.com/theminnercrypto" target="_blank">
              <i class="fab fa-twitter"></i>
              <p class="d-lg-none d-xl-none">Twitter</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="¡Dale me gusta en Facebook!" data-placement="bottom" href="https://www.facebook.com/theminnercrypto" target="_blank">
              <i class="fab fa-facebook-square"></i>
              <p class="d-lg-none d-xl-none">Facebook</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="Siguenos Instagram" data-placement="bottom" href="https://www.instagram.com/theminnercrypto" target="_blank">
              <i class="fab fa-instagram"></i>
              <p class="d-lg-none d-xl-none">Instagram</p>
            </a>
          </li>
    
    `;
    var itemsNavbar = document.getElementById('signupModal');
    itemsNavbar.innerHTML = `
    <div></div>
    `;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user);
  } else {
    // User is signed out
    console.log('No existe usuario activo');
    // ...
  }
});
}
observador();

async function logout(){
  return await firebase.auth().signOut()
  .then(function(){
    location = '../index.html'
    console.log('Saliendo...')
  })
  .catch(function(error){
    console.log(error)
  });
}

async function setupUI(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach(el => (el.style.display = "block"));
    }
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const html = `
      
      `;

    accountDetails.innerHTML = html;
    loggedInMenu.forEach(menu => (menu.style.display = "block"));
    loggedOutMenu.forEach(menu => (menu.style.display = "none"));
  } else {
    quotesUl.innerHTML += "<h3 class='center-align'>Please, login to enjoy our quotes!</h3>";
    loggedInMenu.forEach(menu => (menu.style.display = "none"));
    loggedOutMenu.forEach(menu => (menu.style.display = "block"));
    adminItems.forEach(el => (el.style.display = "none"));
  }
}