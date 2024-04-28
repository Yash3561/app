// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbEx0PgYPK_oTwaFWcIeFCeTH_fVn9FCc",
  authDomain: "myapp-56477.firebaseapp.com",
  projectId: "myapp-56477",
  storageBucket: "myapp-56477.appspot.com",
  messagingSenderId: "117189577563",
  appId: "1:117189577563:web:c22dbadff1a0b08be9e87e",
  measurementId: "G-7RJWVXWCNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
