// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADalWvOBoTXIuEcOknF6Umb3ggMBa6dJM",
  authDomain: "inventory-management-f0f13.firebaseapp.com",
  projectId: "inventory-management-f0f13",
  storageBucket: "inventory-management-f0f13.appspot.com",
  messagingSenderId: "439592477993",
  appId: "1:439592477993:web:ecead1855b729160b54338",
  measurementId: "G-6VDHB41EJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};