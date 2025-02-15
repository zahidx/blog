"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "../components/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle, FaPhone, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Signup() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    const provider = new googleProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);
      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Google Sign-In failed: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { email, password, firstName, lastName } = userData;

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      toast.success("Signup Successful!", { duration: 3000 });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
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
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out pl-10"
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
              </div>
            </div>
            <div className="w-1/2">
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out pl-10"
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
              </div>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out pl-10"
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-xl transition-all duration-300 ease-in-out pl-10"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white bg-[#E69A10] rounded-lg shadow-xl hover:bg-[#d88e0a] transition-all duration-300 ease-in-out ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
