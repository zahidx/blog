// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error.message);
}

// Optional: Initialize Firebase Analytics if it's a browser environment
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error.message);
  }
}

// Initialize Firebase Authentication
let auth;
try {
  auth = getAuth(app);
  console.log("Firebase Authentication initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Authentication:", error.message);
}

// Export Firebase instances for use in other files
export { app, auth, analytics };
