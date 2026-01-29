import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInAnonymously,
} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDerNtb7RH0weuee5JRFxwjP19O7RjJZ30",
    authDomain: "react-login-97fff.firebaseapp.com",
    projectId: "react-login-97fff",
    storageBucket: "react-login-97fff.firebasestorage.app",
    messagingSenderId: "421636135347",
    appId: "1:421636135347:web:398820e3c2cb4752ba13c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, };