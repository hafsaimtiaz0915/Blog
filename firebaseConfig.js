import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, deleteDoc, updateDoc, serverTimestamp, orderBy, arrayUnion, arrayRemove, limit,  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
//--------------------------FIREBASE CONFIG APNA USE KRO---------------------------------//

const firebaseConfig = {
  apiKey: "AIzaSyBrTTdpQsDdk1sT4kecFIOQQhCmYnXSaDc",
  authDomain: "blog-321af.firebaseapp.com",
  databaseURL: "https://blog-321af-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-321af",
  storageBucket: "blog-321af.appspot.com",
  messagingSenderId: "1069129390516",
  appId: "1:1069129390516:web:81bda026c966fb4f6fbae1",
  measurementId: "G-F6TXPWK562"
};

//--------------------------FIREBASE CONFIG APNA USE KRO---------------------------------//

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, onAuthStateChanged, signOut, query, where, storage, ref, uploadBytesResumable, getDownloadURL, deleteDoc, updateDoc, serverTimestamp, orderBy, arrayUnion, arrayRemove, limit, EmailAuthProvider, reauthenticateWithCredential, updatePassword, }