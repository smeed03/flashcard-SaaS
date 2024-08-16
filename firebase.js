// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ97kUyhC8KNyEWl_JGiC7qnuxGu9WaJ8",
  authDomain: "flashcardsaas-d8d1e.firebaseapp.com",
  projectId: "flashcardsaas-d8d1e",
  storageBucket: "flashcardsaas-d8d1e.appspot.com",
  messagingSenderId: "1014094206886",
  appId: "1:1014094206886:web:772649111418ac524ba167",
  measurementId: "G-EEQM91YXL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};