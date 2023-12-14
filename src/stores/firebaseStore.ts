// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjze2b7OpTA8_iAX1UOtDSklsZaTw6aEs",
  authDomain: "timecard-7fcd7.firebaseapp.com",
  projectId: "timecard-7fcd7",
  storageBucket: "timecard-7fcd7.appspot.com",
  messagingSenderId: "393108913533",
  appId: "1:393108913533:web:d230e91430e9014915a014",
  measurementId: "G-KBW8X80NCT"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
