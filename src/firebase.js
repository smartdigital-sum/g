// ============================================================
//  GyanPlay — Firebase Configuration
//  ============================================================
//  SECURITY NOTE: Firebase API keys for web apps are designed
//  to be public. They are NOT secrets. Real security comes from:
//    1. Firestore Security Rules → see firestore.rules
//    2. Firebase Auth → user must be authenticated
//    3. App Check → (optional, add later)
//  
//  To protect your data:
//    - Keep firestore.rules strict (already configured)
//    - Enable Firebase App Check when deploying
//    - Never store server secrets in client-side code
//  ============================================================
//  Get these from: Firebase Console → Project Settings → General
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyC-ihNKw8Zqc4hHIXTvUdY_DV-WEa6aC40",
  authDomain:        "gyanplay-prod.firebaseapp.com",
  projectId:         "gyanplay-prod",
  storageBucket:     "gyanplay-prod.firebasestorage.app",
  messagingSenderId: "670182492112",
  appId:             "1:670182492112:web:3799fa122161af10729bd5",
  measurementId:     "G-1WQEF8JE3W"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
export const auth            = getAuth(app);
export const db              = getFirestore(app);
export const googleProvider  = new GoogleAuthProvider();
