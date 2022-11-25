import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClNWItYAjXIrwy-rqqIoGSz2ND9iixBrM",
  authDomain: "membersandgroups.firebaseapp.com",
  projectId: "membersandgroups",
  storageBucket: "membersandgroups.appspot.com",
  messagingSenderId: "401734859321",
  appId: "1:401734859321:web:b337e483189fc475f86be8"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const categoriesRef = collection(db, "categories")

export {
  db
}