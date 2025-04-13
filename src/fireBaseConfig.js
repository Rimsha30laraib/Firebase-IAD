// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD6vJcgq5lHHCkLAatSMZ_P8kTZ6xD9uY",
  authDomain: "iad-firebase.firebaseapp.com",
  projectId: "iad-firebase",
  storageBucket: "iad-firebase.firebasestorage.app",
  messagingSenderId: "513225031904",
  appId: "1:513225031904:web:e93581922ffeeb8dcb1085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);