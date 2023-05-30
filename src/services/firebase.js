const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
const { signInWithEmailAndPassword, getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const firestore = firebaseAdmin.firestore;
const auth = firebaseAdmin.auth;


const firebaseConfig = {
  apiKey: "AIzaSyAgqzOlVFkPUKp1rfcEB3SScr5gEqiIgfE",
  authDomain: "trashcash-project.firebaseapp.com",
  projectId: "trashcash-project",
  storageBucket: "trashcash-project.appspot.com",
  messagingSenderId: "145498092087",
  appId: "1:145498092087:web:f6a82b21d5f33ff57005b2",
  measurementId: "G-P7HY2P7SWD",
};
// Initialize Firebase
const firebaseClientApp = initializeApp(firebaseConfig);

const login = async (req, reply) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      req.body.email,
      req.body.password
    );
    const token = await userCredential.user.getIdToken();

    return { token };
  } catch (error) {
    console.error("Error login user :", error);
    reply.status(401).send({ message: "Login failed", error });
  }
};

module.exports = { firebaseAdmin, firestore, auth, firebaseClientApp, login };
