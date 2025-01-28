'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { app } from '../components/firebaseConfig'; // Import the initialized Firebase app

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();
  const auth = getAuth(app);

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign-In successful:', result.user);
      router.push('/dashboard'); // Redirect to a dashboard or appropriate page
    } catch (error) {
      setError(error.message);
    }
  };

  // Phone Number Sign-In Handlers
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            console.log('Recaptcha verified');
          },
        },
        auth
      );
    }
  };

  const handleSendOtp = async () => {
    setError(null);
    if (!phone) {
      setError('Please enter a valid phone number.');
      return;
    }
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult; // Save confirmation result for later OTP verification
      setOtpSent(true);

      console.log('OTP sent successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(otp);
      console.log('Phone Sign-In successful:', result.user);
      router.push('/dashboard'); // Redirect to a dashboard or appropriate page
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  // Email/Password Sign-Up Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push('/login'); // Navigate to the login page after signup
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#121212] to-[#380643] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-[#E69A10] dark:text-[#F9C646] mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Email/Password Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-sm"
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
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-sm"
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
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-sm"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white bg-[#E69A10] rounded-lg shadow-lg hover:bg-[#E5970F] transition duration-300 ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
          >
            Sign in with Google
          </button>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1234567890"
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-sm"
            />
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="w-full py-3 mt-4 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
              >
                Send OTP
              </button>
            )}

            {otpSent && (
              <div className="mt-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-[#E69A10] focus:border-[#E69A10] shadow-sm"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-3 mt-4 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
          <div id="recaptcha-container"></div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-[#E69A10] dark:text-[#F9C646] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
