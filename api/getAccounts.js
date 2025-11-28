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
  try {
    const snapshot = await db.collection("accounts").orderBy("name").get();
    const list = [];
    snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
