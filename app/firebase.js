// app/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLgpkWp1lPEqthoQROZGcpqb-ITqtbAmw",
  authDomain: "zentrapay-23063.firebaseapp.com",
  projectId: "zentrapay-23063",
  storageBucket: "zentrapay-23063.firebasestorage.app",
  messagingSenderId: "457012038110",
  appId: "1:457012038110:web:4ba54b2424032fc9b0f54f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
