// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4IuHhONs49cfF-QpiR40vK6dpYQnYe70",
  authDomain: "billease-8ce96.firebaseapp.com",
  projectId: "billease-8ce96",
  storageBucket: "billease-8ce96.appspot.com",
  messagingSenderId: "466833807136",
  appId: "1:466833807136:web:fd03b31367509c853b2945",
  measurementId: "G-DWZXGS8DLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();