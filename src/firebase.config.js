// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPwB0t-PO2AZK5pCe9_wvX2UL8A_H462E",
  authDomain: "wooden-craft-6a404.firebaseapp.com",
  projectId: "wooden-craft-6a404",
  storageBucket: "wooden-craft-6a404.appspot.com",
  messagingSenderId: "12912303795",
  appId: "1:12912303795:web:5beb0f43a857dc7c975ac6",
  measurementId: "G-9V44YGSMQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;