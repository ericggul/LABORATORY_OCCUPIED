// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCltKdLPcbeedZhvMh6be0yRxFwFbrAnzg",
  authDomain: "the-system-one-and-the-only.firebaseapp.com",
  projectId: "the-system-one-and-the-only",
  storageBucket: "the-system-one-and-the-only.appspot.com",
  messagingSenderId: "278329629514",
  appId: "1:278329629514:web:3d4a07bd1edfff197a7fb3",
  measurementId: "G-V6Q04RRDVG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
export const storage = getStorage(app);
