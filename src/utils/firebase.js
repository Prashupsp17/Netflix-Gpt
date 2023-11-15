// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCasSqtkfAECob2SnURqkD9Uqw6cZHwEZE",
  authDomain: "netflix-gpt-74d59.firebaseapp.com",
  projectId: "netflix-gpt-74d59",
  storageBucket: "netflix-gpt-74d59.appspot.com",
  messagingSenderId: "923072389053",
  appId: "1:923072389053:web:c40b5523624406bd5d3cd4",
  measurementId: "G-CMRVFXKZ75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();