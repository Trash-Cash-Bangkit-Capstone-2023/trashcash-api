const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const firestore = firebaseAdmin.firestore();
module.exports = { firebaseAdmin, firestore };
