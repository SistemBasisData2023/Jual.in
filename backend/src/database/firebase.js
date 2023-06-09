const firebase = require("firebase/app");
// require("firebase/storage");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

console.log(process.env.AUTH_DOMAIN)

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get Firebase storage instance
const storage = getStorage();


module.exports = {
  storage
};

