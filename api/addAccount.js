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
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { name, bank, account } = req.body;

  if (!name || !bank || !account) return res.status(400).send("Missing fields");

  try {
    await db.collection("accounts").add({ name, bank, account });
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
