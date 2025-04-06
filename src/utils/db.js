import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBamMQ3ATJHviepJAhUlzXaA6Mn3cg-j3w",
  authDomain: "contact-book-b89be.firebaseapp.com",
  projectId: "contact-book-b89be",
  storageBucket: "contact-book-b89be.firebasestorage.app",
  messagingSenderId: "835051282127",
  appId: "1:835051282127:web:1af0ae02fa03eaad9f61ba"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;