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

const messageForm = document.getElementById("message-form");
const messageContainer = document.getElementById("message-container");
const usersContainer = document.getElementById("users-container");
const adminActive = "admin";
const clientNative = "native";
const clientActive = "active";
const native = document.getElementById('native');
const active = document.getElementById('active');

async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();
    
    const role = userCollection.role;
    if (role==clientActive) {
      active.style.display = "block";
      native.style.display = "none";
      console.log('Cliente Activo');
    } else {
      console.log('Cliente Nativo, por favor proceda a la activación de su cuenta.');
    }
}
}
  
  auth.onAuthStateChanged(async user => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      user.uid = idTokenResult.claims.uid;
      db.collection("users").onSnapshot(setupUI(user),
        err => {}
      );
    } else {
      setupUI();
    }
  });