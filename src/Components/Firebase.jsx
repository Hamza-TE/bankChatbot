// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrhBEu6kY-tl6voD4ATBZvN4YxE8IVaE0",
  authDomain: "chatbotygpt.firebaseapp.com",
  projectId: "chatbotygpt",
  storageBucket: "chatbotygpt.appspot.com",
  messagingSenderId: "607824229272",
  appId: "1:607824229272:web:897b2246c4d14edc6571ed",
  measurementId: "G-K0GRH8PDRS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
