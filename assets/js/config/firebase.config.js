var firebaseConfig = {
  apiKey: "AIzaSyCZQMSMLA87njMhlTNcNfhKDcZ0Xh-0n_c",
  authDomain: "api-minnercrypto.firebaseapp.com",
  projectId: "api-minnercrypto",
  storageBucket: "api-minnercrypto.appspot.com",
  messagingSenderId: "379588906618",
  appId: "1:379588906618:web:3392bd1894df63a9ff75c3",
  measurementId: "G-39JF8TCG9P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
