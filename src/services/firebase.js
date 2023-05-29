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
  apiKey: "AIzaSyBdMqCInK78bFIWdVgPf7Or30f-q6SvRDE",
  authDomain: "trashcash-dev.firebaseapp.com",
  projectId: "trashcash-dev",
  storageBucket: "trashcash-dev.appspot.com",
  messagingSenderId: "666278062343",
  appId: "1:666278062343:web:04841b42ffbb5abfe1fda2",
  measurementId: "G-6VZYBEN13E",
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
