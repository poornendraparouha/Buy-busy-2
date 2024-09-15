
// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8LHUgb2VN5UL_bnv4cmX-y9cc6IdIrio",
  authDomain: "buy-busy-2-d04a2.firebaseapp.com",
  projectId: "buy-busy-2-d04a2",
  storageBucket: "buy-busy-2-d04a2.appspot.com",
  messagingSenderId: "337294848784",
  appId: "1:337294848784:web:27c68abc2e2321121e6b95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


