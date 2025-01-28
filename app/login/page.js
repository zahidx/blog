"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate login process (replace with actual auth logic)
      // Example: await auth.signInWithEmailAndPassword(email, password);

      // Show a success toast
      toast.success("Login Successful!");

      // Countdown before redirecting
      let countdown = 3;
      const countdownToast = toast(`Redirecting to Dashboard in ${countdown}...`, {
        duration: 3000,
      });

      const interval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          toast.dismiss(countdownToast); // Dismiss the previous toast
          toast(`Redirecting to Dashboard in ${countdown}...`, {
            id: countdownToast, // Use the same ID to update the toast
          });
        } else {
          clearInterval(interval); // Clear the interval when countdown is done
          router.push("/dashboard"); // Redirect to the dashboard
        }
      }, 1000);
    } catch (error) {
      setError("Error logging in: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2E6B] to-[#4C66A4] p-6 dark:bg-gradient-to-br dark:from-[#0A2E6B] dark:to-[#4C66A4]">
      {/* Full-screen background container */}
      <motion.div
        className="bg-[#FFFFFF] dark:bg-[#2E3B47] p-10 sm:p-12 rounded-xl shadow-lg w-full sm:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title with cool font */}
        <h2 className="text-4xl font-extrabold text-[#2A3D66] dark:text-[#D1D8E2] text-center mb-8 tracking-tight leading-tight">
          Welcome Back!
        </h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 pl-12 bg-[#F3F5FB] text-[#2A3D66] border border-[#D1D8E2] rounded-2xl shadow-md focus:ring-[#008CBA] focus:outline-none focus:border-[#008CBA] dark:bg-[#3A4A60] dark:text-[#D1D8E2] dark:border-[#4C5B6A] transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#e3e9f2] dark:hover:bg-[#4E5965]"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-[#A1AEBF] transition-all duration-300 transform -translate-y-1/2 dark:text-[#BDC3C7]"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 pl-12 bg-[#F3F5FB] text-[#2A3D66] border border-[#D1D8E2] rounded-2xl shadow-md focus:ring-[#008CBA] focus:outline-none focus:border-[#008CBA] dark:bg-[#3A4A60] dark:text-[#D1D8E2] dark:border-[#4C5B6A] transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#e3e9f2] dark:hover:bg-[#4E5965]"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-[#A1AEBF] transition-all duration-300 transform -translate-y-1/2 dark:text-[#BDC3C7]"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 mt-4 bg-[#008CBA] text-white rounded-2xl shadow-xl hover:bg-[#006F8E] transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-sm text-[#2A3D66] dark:text-[#D1D8E2]">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#008CBA] hover:underline dark:text-[#00A8D6]">
            Sign up here
          </a>
        </p>
      </motion.div>

      {/* Toast Notification */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
