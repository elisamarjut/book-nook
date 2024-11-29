// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCh1oYedj7eBEfqoJJA3cAJI_POmhVhLo",
    authDomain: "book-nook-b8bba.firebaseapp.com",
    databaseURL: "https://book-nook-b8bba-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "book-nook-b8bba",
    storageBucket: "book-nook-b8bba.firebasestorage.app",
    messagingSenderId: "941840806723",
    appId: "1:941840806723:web:b41a2ae6b44c40b37f75f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);