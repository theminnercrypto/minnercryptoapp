async function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var repeatpassword = document.getElementById('repeatpassword').value;

 if (password==repeatpassword) {
  const creds = await firebase.auth().createUserWithEmailAndPassword(email, password)
  return db
  .collection("users")
  .doc(creds.user.uid)
  .set({
    name: signupForm["signup-name"].value
  })
  .then(function(){
    verificar();
    var alerta = document.getElementById('alerta');
    // ..
    alerta.innerHTML = `<div class="alert alert-danger">
    <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
      <i class="tim-icons icon-simple-remove"></i>
    </button>
    <span><b> Danger - </b> This is a regular notification made with ".alert-danger"</span>
    </div>`;
  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

  else 
    alerta.innerHTML = '<div class="alert alert-danger" style="position: absolute; z-index: 100; text-align:center;">¡Hey! Las contreaseñas no son iguales, Intentalo nuevamente</div>';

}

function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    // Navbar
    var itemsNavbar = document.getElementById('items-nav');
    itemsNavbar.innerHTML = `
          <li class="nav-item">
            <a class="nav-link" href="complements/dashboard.html">
              <i class="now-ui-icons transportation_air-baloon"></i>
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
              <a class="dropdown-item" target="_blank" href="#">
                <i class="now-ui-icons files_paper"></i> Documentación
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="Siguenos en Twitter" data-placement="bottom" href="#" target="_blank">
              <i class="fab fa-twitter"></i>
              <p class="d-lg-none d-xl-none">Twitter</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="¡Dale me gusta en Facebook!" data-placement="bottom" href="#" target="_blank">
              <i class="fab fa-facebook-square"></i>
              <p class="d-lg-none d-xl-none">Facebook</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="Siguenos Instagram" data-placement="bottom" href="#" target="_blank">
              <i class="fab fa-instagram"></i>
              <p class="d-lg-none d-xl-none">Instagram</p>
            </a>
          </li>
    
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
    location = 'index.html'
    console.log('Saliendo...')
  })
  .catch(function(error){
    console.log(error)
  });
}

logoutButton.addEventListener("click", async event => {
  event.preventDefault();
  await logout();
});

function verificar(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    console.log('Email verification sent');
    // Email verification sent!
    // ...
  });
}