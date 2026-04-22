// ============================================================
//  GyanPlay — Auth Logic (auth.js)
//  Handles: Email/Password Auth, Phone Lookup Login, Firestore profile
// ============================================================

import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ────────────────────────────────────────────────────
//  REGISTER NEW USER
//  Saves: studentName, fatherName, phone, email to Firestore
// ────────────────────────────────────────────────────
export async function registerUser(email, password, studentName, fatherName, phone) {
  try {
    // Check for duplicate phone before creating account
    const phoneSnap = await getDocs(query(collection(db, "users"), where("phone", "==", phone)));
    if (!phoneSnap.empty) {
      return { success: false, error: "phone_in_use", message: "This phone number is already registered." };
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user   = result.user;

    await setDoc(doc(db, "users", user.uid), {
      studentName,
      fatherName,
      phone,
      email,
      name:        studentName,  // kept for backward compatibility
      photoURL:    "",
      language:    "en",
      createdAt:   serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });

    return { success: true, user };

  } catch (err) {
    console.error("Register error:", err);
    const msgs = {
      "auth/email-already-in-use": "This email is already registered. Please log in.",
      "auth/weak-password":        "Password must be at least 6 characters.",
      "auth/invalid-email":        "Please enter a valid email address.",
    };
    return {
      success: false,
      error:   err.code,
      message: msgs[err.code] || "Something went wrong. Please try again."
    };
  }
}

// ────────────────────────────────────────────────────
//  LOGIN WITH GOOGLE
//  Opens Google popup, creates Firestore profile if new user
// ────────────────────────────────────────────────────
export async function loginWithGoogle(googleProvider) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user   = result.user;

    // If this is the user's first sign-in, create a Firestore profile
    const profileSnap = await getDoc(doc(db, "users", user.uid));
    if (!profileSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        studentName:  user.displayName || "",
        fatherName:   "",
        phone:        user.phoneNumber || "",
        email:        user.email || "",
        name:         user.displayName || "",
        photoURL:     user.photoURL || "",
        language:     "en",
        createdAt:    serverTimestamp(),
        lastLoginAt:  serverTimestamp(),
        authProvider: "google"
      });
    } else {
      // Update last login for returning users
      await setDoc(doc(db, "users", user.uid), { lastLoginAt: serverTimestamp() }, { merge: true });
    }

    return { success: true, user };
  } catch (err) {
    console.error("Google login error:", err);
    if (err.code === "auth/popup-closed-by-user") {
      return { success: false, error: "popup_closed", message: "Sign-in was cancelled." };
    }
    return {
      success: false,
      error:   err.code,
      message: "Google sign-in failed. Please try again."
    };
  }
}

// ────────────────────────────────────────────────────
//  LOGIN WITH EMAIL + PASSWORD
// ────────────────────────────────────────────────────
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), { lastLoginAt: serverTimestamp() }, { merge: true });
    return { success: true, user: result.user };
  } catch (err) {
    console.error("Login error:", err);
    const msgs = {
      "auth/user-not-found":     "No account found with this email.",
      "auth/wrong-password":     "Incorrect password.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/too-many-requests":  "Too many attempts. Please try again later.",
      "auth/invalid-email":      "Please enter a valid email address.",
    };
    return {
      success: false,
      error:   err.code,
      message: msgs[err.code] || "Incorrect email or password."
    };
  }
}

// ────────────────────────────────────────────────────
//  LOGIN WITH PHONE + PASSWORD
//  Looks up the email linked to that phone in Firestore,
//  then signs in with email + password (no SMS needed).
// ────────────────────────────────────────────────────
export async function loginWithPhone(phone, password) {
  try {
    const phoneSnap = await getDocs(query(collection(db, "users"), where("phone", "==", phone)));
    if (phoneSnap.empty) {
      return { success: false, error: "phone_not_found", message: "No account found with this phone number." };
    }
    const email = phoneSnap.docs[0].data().email;
    return await loginWithEmail(email, password);
  } catch (err) {
    console.error("Phone login error:", err);
    return { success: false, error: err.code, message: "Something went wrong. Please try again." };
  }
}

// ────────────────────────────────────────────────────
//  SEND PASSWORD RESET EMAIL
// ────────────────────────────────────────────────────
export async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    const msgs = {
      "auth/user-not-found": "No account found with this email.",
      "auth/invalid-email":  "Please enter a valid email address.",
    };
    return {
      success: false,
      error:   err.code,
      message: msgs[err.code] || "Something went wrong. Please try again."
    };
  }
}

// ────────────────────────────────────────────────────
//  SIGN OUT
// ────────────────────────────────────────────────────
export async function logOut() {
  localStorage.removeItem("gyanplay_logged_in");
  localStorage.removeItem("gyanplay_uid");
  localStorage.removeItem("gyanplay_user_name");
  await signOut(auth);
  window.location.href = "login.html";
}

// ────────────────────────────────────────────────────
//  AUTH STATE WATCHER
//  Use on every protected page — redirects to login if not signed in.
//
//  Usage:
//    requireAuth((user) => { /* user is logged in */ });
// ────────────────────────────────────────────────────
export function requireAuth(onLoggedIn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onLoggedIn(user);
    } else {
      window.location.href = "login.html";
    }
  });
}

// ────────────────────────────────────────────────────
//  GET USER PROFILE FROM FIRESTORE
// ────────────────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// ────────────────────────────────────────────────────
//  SAVE LANGUAGE PREFERENCE TO FIRESTORE
// ────────────────────────────────────────────────────
export async function saveLangPreference(uid, lang) {
  await setDoc(doc(db, "users", uid), { language: lang }, { merge: true });
}
