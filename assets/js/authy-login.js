function getLoginFormInfo() {
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  return { email, password };
}

async function login(email, password) {
  return await auth.signInWithEmailAndPassword(email, password);
}

async function logout() {
  return await auth.signOut();
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const { email, password } = getLoginFormInfo();
    await login(email, password);
  } catch (ex) {
    alert("An error ocurred trying to signup: " + ex.message);
  } finally {
    location = '../complements/dashboard.html';
  }
});