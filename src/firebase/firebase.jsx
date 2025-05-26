// Import the functions you need from the SDKs you need
'use client'
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsqjQP3WsiC-1_BEj0R9ZEQmkaoVZUxZI",
  authDomain: "udmee-14bdc.firebaseapp.com",
  projectId: "udmee-14bdc",
  storageBucket: "udmee-14bdc.firebasestorage.app",
  messagingSenderId: "975152366992",
  appId: "1:975152366992:web:a334a58ba64411e6bf9f15",
  measurementId: "G-ZCM5CMFVN4"
};
// if (typeof window !== 'undefined') {
//     return 
// }
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// const pr = firebase.auth.GoogleAuthProvider()
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
// const analytics = getAnalytics(app);

export { app };