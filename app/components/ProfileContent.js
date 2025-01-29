'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../components/firebaseConfig';
import { FaUserCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (!user) throw new Error('User not authenticated.');

      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) throw new Error('No user data found.');

      const userData = docSnap.data();

      // Save user data to localStorage (optional, as previously discussed)
      localStorage.setItem('userData', JSON.stringify(userData));
      setUserData(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Check if user data is already in localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
          setLoading(false);
        } else {
          fetchUserData();
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false); // Stop loading if user is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [fetchUserData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <FaSpinner className="animate-spin text-4xl text-gray-500 dark:text-gray-300" />
        <p className="ml-2 text-lg text-gray-500 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-6 text-red-500 dark:text-red-300">
        <FaExclamationCircle className="mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-300">
        <FaUserCircle className="mx-auto text-6xl text-gray-400" />
        <p className="mt-2 text-lg">User not authenticated. Please log in.</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-300">
        <FaUserCircle className="mx-auto text-6xl text-gray-400" />
        <p className="mt-2 text-lg">No user data available. Please log in again.</p>
      </div>
    );
  }

  const { firstName = 'First Name', lastName = 'Last Name', email, createdAt } = userData;
  const formattedDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : 'Date not available';

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643] text-white">
      <div className="flex flex-col items-center py-10">
        <div className="relative w-full max-w-4xl text-center">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg backdrop-blur-md"></div>
          <div className="relative bg-cover bg-center h-80 rounded-lg shadow-2xl overflow-hidden" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
              <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">Welcome Back, {firstName}</h2>
              <p className="text-xl opacity-90">Manage your account and blog activity</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-2xl mt-8 w-full max-w-4xl text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-[#E5970F] to-[#E69A10] p-2 shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaUserCircle className="h-full w-full text-white" />
            </div>
            <h3 className="text-4xl font-semibold text-gray-800 dark:text-white">{firstName} {lastName}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">{email}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Joined on: {formattedDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-4xl">
          {[ 
            { title: 'Blog Stats', details: ['Total Views: 1500', 'Total Posts: 25'] },
            { title: 'Recent Activity', details: ['Last Post: "How to Use Firebase"', 'Posted on: Jan 25, 2025'] },
            { title: 'Account Settings', details: ['Change your password, update details.'] }
          ].map((card, index) => (
            <div key={index} className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10 rounded-lg"></div>
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{card.title}</h4>
              {card.details.map((detail, idx) => (
                <p key={idx} className="text-lg text-gray-600 dark:text-gray-300">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} containerStyle={{ marginTop: "50px" }} />
    </div>
  );
}
