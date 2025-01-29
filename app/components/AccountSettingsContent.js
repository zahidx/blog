'use client';

import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../components/firebaseConfig';
import { FaUserCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const fetchUserData = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Try to load data from localStorage first
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setFormData(JSON.parse(storedData));
      setLoading(false);
      return; // If data is in localStorage, skip the Firestore fetch
    }

    // If no data in localStorage, fetch from Firestore
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setUserData(fetchedData);
          setFormData({
            firstName: fetchedData.firstName,
            lastName: fetchedData.lastName,
            email: fetchedData.email
          });
          localStorage.setItem('userData', JSON.stringify(fetchedData)); // Save to localStorage
        } else {
          setError('No user data found.');
        }
      } else {
        setError('User not authenticated.');
      }
    } catch (err) {
      setError('Error fetching user data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Call fetchUserData on component mount
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Show the editing form
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Close the editing form
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    }); // Reset form to original data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, formData);
        setUserData({ ...userData, ...formData });
        localStorage.setItem('userData', JSON.stringify({ ...userData, ...formData })); // Update localStorage
        setIsEditing(false); // Close the editing form after submission
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      setError('Error updating user data: ' + err.message);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6 animate-pulse">
        <FaSpinner className="animate-spin text-3xl text-indigo-500" />
        <p className="ml-2 text-lg text-indigo-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-6 text-red-500">
        <FaExclamationCircle className="mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-6 text-gray-500">
        <FaUserCircle className="mx-auto text-5xl" />
        <p>No user data available. Please log in.</p>
      </div>
    );
  }

  const { firstName, lastName, email, createdAt } = userData;
  const formattedDate = createdAt && createdAt.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : 'Date not available';

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-900 text-white rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-100 transition-all duration-500 ease-in-out transform hover:scale-105">
          {`Welcome Back, ${firstName}!`}
        </h3>
        <p className="text-lg text-gray-50 opacity-80 transition-all duration-500 ease-in-out hover:opacity-100">
          Manage your profile and settings here.
        </p>
      </div>

      {/* User Data Section */}
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-xl shadow-xl mb-6 transition-all duration-500 transform hover:scale-105">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-teal-600 text-6xl transform transition-transform duration-500 hover:scale-125 hover:text-teal-700" />
        </div>
        <h4 className="text-2xl font-semibold">{firstName} {lastName}</h4>
        <p className="text-lg mb-2">Email: <span className="font-medium">{email}</span></p>
        <p className="text-lg">Joined: <span className="font-medium">{formattedDate}</span></p>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleEditClick}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-xl text-white transition-all duration-500 ease-in-out transform hover:scale-105">
          <div>
            <label htmlFor="firstName" className="block text-lg">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-lg">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Toaster Component for toast notifications */}
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ marginTop: "50px" }} />
    </div>
  );
}
