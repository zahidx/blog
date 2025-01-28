"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { FaGoogle, FaPhone } from "react-icons/fa"; // Import the icons
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

// Firebase configuration with environment variables
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
let analytics;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");

  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
    console.log("Analytics initialized successfully");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);
      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Google Sign-In failed: " + error.message);
    }
  };

  // Email/Password Sign-Up Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the first name and email to Firestore in a separate collection
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      setLoading(false);

      // Show success toast
      toast.success("Signup Successful!", {
        duration: 3000,
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message); // Show error toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#121212] to-[#380643] flex items-center justify-center p-6">
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ marginTop: "80px" }} />

      <div className="max-w-lg w-full bg-white dark:bg-gray-900 p-12 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-[#E69A10] dark:text-[#F9C646] mb-8">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">
            {error}
          </div>
        )}

        {/* Social Sign-In Options */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full sm:w-1/2 py-3 text-white bg-[#DB4437] rounded-lg shadow-xl hover:bg-[#c23527] transition-all duration-300 ease-in-out"
          >
            <FaGoogle className="mr-2 text-lg" />
            Sign up with Google
          </button>

          <button
            onClick={() => console.log("Phone sign-up clicked")}
            className="flex items-center justify-center w-full sm:w-1/2 py-3 text-white bg-[#0C9E4A] rounded-lg shadow-xl hover:bg-[#087938] transition-all duration-300 ease-in-out"
          >
            <FaPhone className="mr-2 text-lg" />
            Sign up with Phone
          </button>
        </div>

        {/* Email/Password Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 mt-6 text-white bg-[#E69A10] rounded-lg shadow-xl hover:bg-[#E5970F] transition-all duration-300 ease-in-out ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {/* Already have an account - Login Link */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#E69A10] hover:text-[#c23527] transition-all duration-300 ease-in-out"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
