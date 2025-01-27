'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Smooth animations

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate login process (replace with actual auth logic)
      // Example: await auth.signInWithEmailAndPassword(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2C3E50] to-[#34495E] p-6">
      {/* Full-screen background container */}
      <motion.div
        className="bg-white p-12 rounded-xl shadow-2xl w-full sm:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title with cool font */}
        <h2 className="text-4xl font-extrabold text-[#2C3E50] text-center mb-8 tracking-tight">
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
              className="w-full p-4 pl-10 bg-[#F4F6F9] text-[#2C3E50] border border-[#BDC3C7] rounded-xl shadow-md focus:ring-[#2980B9] focus:outline-none focus:border-[#2980B9] transition-all duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-[#BDC3C7] transition-all duration-300 transform -translate-y-1/2"
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
              className="w-full p-4 pl-10 bg-[#F4F6F9] text-[#2C3E50] border border-[#BDC3C7] rounded-xl shadow-md focus:ring-[#2980B9] focus:outline-none focus:border-[#2980B9] transition-all duration-300"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-[#BDC3C7] transition-all duration-300 transform -translate-y-1/2"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 mt-4 bg-[#2980B9] text-white rounded-xl shadow-lg hover:bg-[#3498DB] transition duration-300 ease-in-out transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-sm text-[#2C3E50]">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#2980B9] hover:underline">
            Sign up here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
