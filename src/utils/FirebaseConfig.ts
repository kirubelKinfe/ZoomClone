// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB2cCHBlJaQFNDmvNLCUyM3YLziX8-p9o",
  authDomain: "videochatapp-be228.firebaseapp.com",
  projectId: "videochatapp-be228",
  storageBucket: "videochatapp-be228.appspot.com",
  messagingSenderId: "694314173112",
  appId: "1:694314173112:web:a9a5ce962127b4097a2a4d",
  measurementId: "G-DPMYXDPXKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)

export const userRef = collection(firestore, "Users");
export const meetingsRef = collection(firestore, "Meetings");