// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwAwW2jAyTsdV2dcxmu54Nlo3bE00ZXSw",
  authDomain: "business-directory-7e8c8.firebaseapp.com",
  projectId: "business-directory-7e8c8",
  storageBucket: "business-directory-7e8c8.appspot.com",
  messagingSenderId: "914049521256",
  appId: "1:914049521256:web:ce785e8c7ddf4c347fcddd",
  measurementId: "G-QBDEBZM7Y7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);