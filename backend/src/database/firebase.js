const firebase = require("firebase/app");
// require("firebase/storage");
const { getStorage } = require("firebase/storage");

/**
 * The Firebase configuration object.
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - The API key.
 * @property {string} authDomain - The auth domain.
 * @property {string} projectId - The project ID.
 * @property {string} storageBucket - The storage bucket.
 * @property {string} messagingSenderId - The messaging sender ID.
 * @property {string} appId - The app ID.
 * @property {string} measurementId - The measurement ID.
 */

/**
 * The Firebase configuration.
 * @type {FirebaseConfig}
 */
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

/**
 * Initializes the Firebase app with the provided configuration.
 * @param {FirebaseConfig} config - The Firebase configuration object.
 */
firebase.initializeApp(firebaseConfig);

/**
 * The Firebase storage instance.
 * @type {Object}
 */
const storage = getStorage();

module.exports = {
  storage
};

