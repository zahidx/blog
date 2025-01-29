'use client';

import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../components/firebaseConfig';
import { FaUserCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster component

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Function to fetch user data
  const fetchUserData = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setFormData({
            firstName: docSnap.data().firstName,
            lastName: docSnap.data().lastName,
            email: docSnap.data().email
          });
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
        await updateDoc(userDocRef, formData); // Update the user data in Firestore
        setUserData({ ...userData, ...formData });
        setIsEditing(false); // Close the editing form after submission
        toast.success('Profile updated successfully!'); // Success toast
        fetchUserData(); // Re-fetch data after successful update
      }
    } catch (err) {
      setError('Error updating user data: ' + err.message);
      toast.error('Failed to update profile. Please try again.'); // Error toast
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <FaSpinner className="animate-spin text-2xl text-gray-500 dark:text-gray-300" />
        <p className="ml-2 text-gray-500 dark:text-gray-300">Loading data...</p>
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

  if (!userData) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-300">
        <FaUserCircle className="mx-auto text-4xl" />
        <p>No user data available. Please log in.</p>
      </div>
    );
  }

  const { firstName, lastName, email, createdAt } = userData;
  const formattedDate = createdAt && createdAt.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : 'Date not available';

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Welcome to the Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Here you can see an overview of your blog's performance and account details.
        </p>

        {/* User Data Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {firstName} {lastName}
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Email: <span className="font-medium">{email}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Joined: <span className="font-medium">{formattedDate}</span>
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Profile Form (if isEditing is true) */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Toaster Component for toast notifications */}
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ marginTop: "50px" }} />



    </div>
  );
}
