import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlEx84N2KWYCTENe7rXtDKJKblWBNd20s",
  authDomain: "project-b7c46.firebaseapp.com",
  projectId: "project-b7c46",
  storageBucket: "project-b7c46.firebasestorage.app",
  messagingSenderId: "857669598949",
  appId: "1:857669598949:web:2589a913f28ef13a311e0c",
  measurementId: "G-WPTC3ERYJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
