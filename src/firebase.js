// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";  // Import auth functions
import { getFirestore} from "firebase/firestore";  // For Firestore
import { getStorage } from "firebase/storage";  // For Storage

const firebaseConfig = {
  apiKey: "AIzaSyAWMmEENqMAf88Lz2UeBkQabFBA8-8ZflE",
  authDomain: "midterm-d1739.firebaseapp.com",
  projectId: "midterm-d1739",
  storageBucket: "midterm-d1739.appspot.com",
  messagingSenderId: "873765072698",
  appId: "1:873765072698:web:e8e4e80985818d9edf6a03",
  measurementId: "G-RP1JH35LTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication helper functions
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export { auth, storage, db, analytics, signIn, signUp, signInWithGoogle };
