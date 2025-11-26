const admin = require("firebase-admin");
require("dotenv").config(); 

if (!admin.apps.length) {
  admin.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
     
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
