// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodvingo-a6c54.firebaseapp.com",
  projectId: "foodvingo-a6c54",
  storageBucket: "foodvingo-a6c54.firebasestorage.app",
  messagingSenderId: "1014931336469",
  appId: "1:1014931336469:web:523bcd2bfda42da3e1cd1c",
  measurementId: "G-S3BFEQ4YBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default {app, auth}
