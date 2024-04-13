// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCd-UGGw1fmOn0zre_sa83_jIULudO0NI",
  authDomain: "netflixgpt-e8084.firebaseapp.com",
  projectId: "netflixgpt-e8084",
  storageBucket: "netflixgpt-e8084.appspot.com",
  messagingSenderId: "851763797917",
  appId: "1:851763797917:web:0a3002e70f1a829dce1974",
  measurementId: "G-3PZQ65M64N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
