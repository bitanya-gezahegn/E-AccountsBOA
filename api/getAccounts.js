const admin = require("firebase-admin");
require("dotenv").config(); 

if (!admin.apps.length) {
  admin.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
     
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    const snapshot = await db.collection("accounts").orderBy("name").get();
    const list = [];
    snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
