require("dotenv").config();
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
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const firebaseClientApp = initializeApp(firebaseConfig);

const login = async (req, reply) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      req.body.email,
      req.body.password,
    );
    const token = await userCredential.user.getIdToken();

    return { token };
  } catch (error) {
    console.error("Error login user :", error);
    reply.status(401).send({ message: "Login failed", error });
  }
};

module.exports = { firebaseAdmin, firestore, auth, firebaseClientApp, login };
