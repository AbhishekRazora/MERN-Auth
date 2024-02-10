// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-67e39.firebaseapp.com",
  projectId: "mern-auth-67e39",
  storageBucket: "mern-auth-67e39.appspot.com",
  messagingSenderId: "151422140702",
  appId: "1:151422140702:web:a8147b39ed798e6725890f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



// https://mern-auth-67e39.firebaseapp.com/__/auth/handler