import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeUPoApfBaUeRk8g8yHYwq9ZkTxuM1HFo",
  authDomain: "habittrackr-app.firebaseapp.com",
  projectId: "habittrackr-app",
  storageBucket: "habittrackr-app.firebasestorage.app",
  messagingSenderId: "10151297988",
  appId: "1:10151297988:web:781100998b253ca8c61a91",
  measurementId: "G-BY4LKVX6D2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
