import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeQk2vDFFPBAUb6bnTKZ-vKUgRP9vJbIA",
  authDomain: "transporte35-50c48.firebaseapp.com",
  projectId: "transporte35-50c48",
  storageBucket: "transporte35-50c48.firebasestorage.app",
  messagingSenderId: "164933296607",
  appId: "1:164933296607:web:0aacd25f24ac532e78246a",
  measurementId: "G-7Y4ZTE29G0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


