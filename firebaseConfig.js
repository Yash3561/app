// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let app;
let authInstance;


const getFirebaseApp = () => {
  if (!app) {
    const firebaseConfig = {
      apiKey: "AIzaSyCbEx0PgYPK_oTwaFWcIeFCeTH_fVn9FCc",
      authDomain: "myapp-56477.firebaseapp.com",
      projectId: "myapp-56477",
      storageBucket: "myapp-56477.appspot.com",
      messagingSenderId: "117189577563",
      appId: "1:117189577563:web:c22dbadff1a0b08be9e87e",
      measurementId: "G-7RJWVXWCNL"
    };
    app = initializeApp(firebaseConfig);

    // Initialize Firebase Auth with persistence
  }
  return app;
};


export {getFirebaseApp}
