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

const balanceId = document.getElementById("balance");
const investmentId = document.getElementById("investment");
const referralId = document.getElementById("referral");
async function setupUI(user) {
  if (user) {
    const userCollection = (await db
      .collection("users")
      .doc(user.uid)
      .get()).data();

    const balance = `<i class="tim-icons icon-bell-55 text-primary"></i> $${userCollection.balance}`;
    const investment = `<i class="tim-icons icon-delivery-fast text-info"></i> $${userCollection.investment}`;
    const referral = `<i class="tim-icons icon-send text-success"></i> $${userCollection.referral}`;

    balanceId.innerHTML = balance;
    investmentId.innerHTML = investment;
    referralId.innerHTML = referral;
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
