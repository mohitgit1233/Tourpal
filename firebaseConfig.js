// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT-dRzb2pbR9exsiiIJtoILkf5ck3X0pg",
  authDomain: "tourpal-e680e.firebaseapp.com",
  projectId: "tourpal-e680e",
  storageBucket: "tourpal-e680e.appspot.com",
  messagingSenderId: "648603206107",
  appId: "1:648603206107:web:c425541113bc713a2be7fe",
  measurementId: "G-G9LL7MBNG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);