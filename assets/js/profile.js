function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Existe usuario activo');
    var uid = user.uid;
    console.log(user);
    // ...
  } else {
    location = '../components/login-page.html'
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

function verificar(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    console.log('Email verification sent');
    // Email verification sent!
    // ...
  });
}

const profile = document.getElementById("profile");
async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const html = `
    <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h5 class="title">Edit Profile</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-5 pr-md-1">
                <div class="form-group">
                  <label>Correo Electrónico</label>
                  <input type="text" class="form-control" disabled="" placeholder="Email..." value="${user.email}">
                </div>
              </div>
              <div class="col-md-3 px-md-1">
                <div class="form-group">
                  <label>Usuario</label>
                  <input type="text" class="form-control" placeholder="Usuario..." value="${userCollection.username}">
                </div>
              </div>
              <div class="col-md-4 pl-md-1">
                <div class="form-group">
                  <label for="exampleInputEmail1">Número de Teléfono</label>
                  <input type="email" class="form-control" placeholder="Número de Teléfono..." value="${userCollection.phone}">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 pr-md-1">
                <div class="form-group">
                  <label>Nombres</label>
                  <input type="text" class="form-control" placeholder="Nombres..." value="${userCollection.name}">
                </div>
              </div>
              <div class="col-md-6 pl-md-1">
                <div class="form-group">
                  <label>Apellidos</label>
                  <input type="text" class="form-control" placeholder="Apellidos..." value="${userCollection.lastname}">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Dirección Físcal</label>
                  <input type="text" class="form-control" placeholder="Dirección..." value="${userCollection.address}">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 pr-md-1">
                <div class="form-group">
                  <label>Ciudad</label>
                  <input type="text" class="form-control" placeholder="Ciudad..." value="${userCollection.city}">
                </div>
              </div>
              <div class="col-md-4 px-md-1">
                <div class="form-group">
                  <label>País</label>
                  <input type="text" class="form-control" placeholder="País..." value="${userCollection.country}">
                </div>
              </div>
              <div class="col-md-4 pl-md-1">
                <div class="form-group">
                  <label>Código Postal</label>
                  <input type="number" class="form-control" placeholder="Código Postal..." value="${userCollection.zip}">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label>Identificador de Wallet Bitcoin</label>
                  <textarea rows="4" cols="80" class="form-control" placeholder="Aquí va su identificador...">${userCollection.wallet}</textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-fill btn-primary">Save</button>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card card-user">
        <div class="card-body">
          <p class="card-text">
            </p><div class="author">
              <div class="block block-one"></div>
              <div class="block block-two"></div>
              <div class="block block-three"></div>
              <div class="block block-four"></div>
              <a href="javascript:void(0)">
                <img class="avatar" src="../assets/img/emilyz.jpg" alt="...">
                <h5 class="title">${userCollection.name} ${userCollection.lastname}</h5>
              </a>
              <p class="description">
              ${userCollection.role}
              </p>
            </div>
            </br>
          <p class="text-center">Pulse el botón ahora mismo para enviar un metodo de verificación al correo.</p>
          <button class="btn btn-primary btn-block">¡Verificame Ahora!</button>
        </div>
      </div>
    </div>
  </div>
      `;

    profile.innerHTML = html;
  } else {
    alert("Please, login to enjoy our quotes!");
  }
}

auth.onAuthStateChanged(async user => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    user.uid = idTokenResult.claims.uid;
    db.collection("users").onSnapshot(setupUI(user),
      err => {
        setupUI(user);
      },
      err => {}
    );
  } else {
    setupUI();
  }
});
