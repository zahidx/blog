'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../components/firebaseConfig';
import { FaSignOutAlt, FaChartBar, FaUsers, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Toaster, toast } from 'react-hot-toast';
import 'chart.js/auto';
import CuteLoader from "./CuteLoader";

export default function AdvancedDashboard() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const currentUser = auth.currentUser;

      if (!currentUser) throw new Error('User not authenticated');

      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (!userDoc.exists()) throw new Error('User data not found');

      setUser(userDoc.data());
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  // add loader
  useEffect(() => {
    // Simulating data fetching or any async task
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Replace with your actual async logic
  }, []);

  useEffect(() => {
    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [5000, 7000, 6500, 8000, 12000, 15000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
        },
      ],
    });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    signOut(getAuth(app))
      .then(() => toast.success('Logged out successfully'))
      .catch((err) => toast.error('Error logging out: ' + err.message));
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-300">
        <p className="text-xl"></p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <CuteLoader /> // Show loader while loading
      ) : (
    <div className={`min-h-screen bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-white`}>
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
          </button>
          <span className="text-lg">{user.firstName}</span>
          
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards with Neon Effects */}
        {[
          { title: 'Total Users', value: '15,300', icon: FaUsers, color: 'bg-blue-500' },
          { title: 'Revenue', value: '$98,200', icon: FaChartBar, color: 'bg-green-500' },
          { title: 'Settings', value: 'Advanced', icon: FaCog, color: 'bg-purple-500' }
        ].map((card, index) => (
          <div key={index} className={`${card.color} text-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{card.title}</h4>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <card.icon className="text-4xl opacity-75" />
            </div>
          </div>
        ))}

        {/* Interactive Chart Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Revenue Insights</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Line data={chartData} />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
      )}
    </div>
  );
}
