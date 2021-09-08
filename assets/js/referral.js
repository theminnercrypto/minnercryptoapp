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

var boton = document.getElementById("copiador");
boton.addEventListener("click", copiarAlPortapapeles, false);
function copiarAlPortapapeles() {
  var enlace = document.getElementById("enlace");
  var inputFalso = document.createElement("input");
  var alert = document.getElementById('alert'); 
  inputFalso.setAttribute("value", enlace.innerHTML);
  document.body.appendChild(inputFalso);
  inputFalso.select();
  document.execCommand("copy");
  document.body.removeChild(inputFalso);
  alert.innerHTML = `<div class="alert alert-success">
  <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
    <i class="tim-icons icon-simple-remove"></i>
  </button>
  <span><b> ¡Exito! - </b> Se ha pegado el código de promoción al portapapeles.</span>
</div>`;
}

const messageForm = document.getElementById("message-form");
const messageContainer = document.getElementById("message-container");
const usersContainer = document.getElementById("users-container");
const adminActive = "admin";
const clientNative = "native";
const clientActive = "active";
const native = document.getElementById('native');
const active = document.getElementById('active');
const avanced = document.getElementById('avanced');

let editStatus = false;
let id = '';

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
const sendEmail = (name, email, message) =>
  db.collection("messages").doc().set({
    name,
    email,
    message,
  });

const getUsers = () => db.collection("users").get();

const deleteUser = (id) => db.collection("users").doc(id).delete();

const getUser = (id) => db.collection("users").doc(id).get();

const updateUser = (id, updatedUser) => db.collection('users').doc(id).update(updatedUser);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsers((querySnapshot) => {

    const btnsDelete = usersContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteUser(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = usersContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getUser(e.target.dataset.id);
          const user = doc.data();
          userForm["user-name"].value = user.name;
          userForm["user-lastname"].value = user.lastname;
          userForm["user-phone"].value = user.phone;
          userForm["user-city"].value = user.city;
          userForm["user-country"].value = user.country;
          userForm["user-wallet"].value = user.wallet;
          userForm["user-address"].value = user.address;
          userForm["user-address"].value = user.address;
          userForm["user-zip"].value = user.zip;

          editStatus = true;
          id = doc.id;
          userForm["btn-user-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

async function setupUI(user) {
  //Leer documentos
    (await db.collection("users").doc(user.uid).get()).data();
    const check = user.role;
    if (check==adminActive) {
      const html = ``;
      active.innerHTML = html;
      native.innerHTML = html;
      console.log('¡Bienvenido Administrador!');
    } else {
      const html = ``;
      avanced.innerHTML = html;
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

db.collection("users").onSnapshot((querySnapshot) => {
    usersContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        usersContainer.innerHTML += `
          <tr>
            <td>
            ${doc.data().name}
            </td>
            <td>
            ${doc.data().lastname}
            </td>
            <td>
            ${doc.data().email}
            </td>
            <td>
            ${doc.data().wallet}
            </td>
            <td>
            <label class="switchBtn">
              <input type="checkbox" id="checkbox">
                <div class="slide round">Minar</div>
            </label>
            </td>
            <td class="text-center">
            ${doc.data().plan}
            </td>
          </tr>
        `
    });
});

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = userForm["user-name"];
  const email = userForm["user-email"];
  const message = userForm["user-message"];

  try {
    if (!editStatus) {
      await saveUser(name.value, email.value, message.value);
    } else {
      await updateUser(id, {
        name: name.value,
        email: email.value,
        message: message.value,
      })

      editStatus = false;
      id = '';
      userForm['btn-user-form'].innerText = 'Save';
    }

    userForm.reset();
    name.focus();
  } catch (error) {
    console.log(error);
  }
});