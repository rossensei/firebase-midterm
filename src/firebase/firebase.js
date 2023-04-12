// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkzJB__xjI6kvSIFLUJ0hrImdPGWerauk",
  authDomain: "fir-midterm-13034.firebaseapp.com",
  projectId: "fir-midterm-13034",
  storageBucket: "fir-midterm-13034.appspot.com",
  messagingSenderId: "322481417811",
  appId: "1:322481417811:web:bc0e14b61e90766d79a0a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }