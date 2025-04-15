// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHeSQPBWoh9BQL8pRF-F6bEwpNsbArlrw",
  authDomain: "watchwise-ce1a5.firebaseapp.com",
  projectId: "watchwise-ce1a5",
  storageBucket: "watchwise-ce1a5.firebasestorage.app",
  messagingSenderId: "226127312277",
  appId: "1:226127312277:web:bda163e7f27864f0d1729c",
  measurementId: "G-CE153Z0ZH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firebase Analytics (optional, if needed for analytics)
const analytics = getAnalytics(app);
