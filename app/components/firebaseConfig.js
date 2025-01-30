// Import necessary functions from Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Prevent multiple Firebase initializations
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth Persistence Error:", error);
});

// Initialize Firebase Analytics (only if window is available)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, db, auth, analytics, storage };  // Export storage as well