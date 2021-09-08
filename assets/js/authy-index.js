signupForm.addEventListener("submit", async event => {
  event.preventDefault();

  try {
    const { email, password } = getSignupFormInfo();
    await signup(email, password);
  } catch (ex) {
    alert("An error ocurred trying to signup: " + ex.message);
  } finally {
    location = "./complements/dashboard.html";
  }
});

function getSignupFormInfo() {
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  return { email, password };
}

async function signup(email, password) {
  const creds = await auth.createUserWithEmailAndPassword(email, password);
  return db
    .collection("users")
    .doc(creds.user.uid)
    .set({
      name: signupForm["signup-name"].value,
      lastname: signupForm["signup-lastname"].value,
      email: signupForm["signup-email"].value,
      wallet: signupForm["signup-wallet"].value,
      referral: signupForm["signup-referral"].value,
      role: "Nativo",
      balance: "0.00",
      investment: "0.00",
      referral: "0",
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