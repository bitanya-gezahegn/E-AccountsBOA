const admin = require("firebase-admin");
require("dotenv").config(); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { name, account } = req.body;

  if (!name || !account) return res.status(400).send("Missing fields");

  try {
    await db.collection("accounts").add({ name,account });
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
