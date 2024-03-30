// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrTTdpQsDdk1sT4kecFIOQQhCmYnXSaDc",
  authDomain: "blog-321af.firebaseapp.com",
  projectId: "blog-321af",
  storageBucket: "blog-321af.appspot.com",
  messagingSenderId: "1069129390516",
  appId: "1:1069129390516:web:81bda026c966fb4f6fbae1",
  measurementId: "G-F6TXPWK562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);