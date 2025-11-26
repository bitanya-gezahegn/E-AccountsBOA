const admin = require("firebase-admin");
require("dotenv").config(); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
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
