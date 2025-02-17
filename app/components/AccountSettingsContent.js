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

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setFormData(JSON.parse(storedData));
      setLoading(false);
      return;
    }

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
          localStorage.setItem('userData', JSON.stringify(fetchedData));
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
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    });
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
        localStorage.setItem('userData', JSON.stringify({ ...userData, ...formData }));
        setIsEditing(false);
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
      <div className="w-full mx-auto px-6 py-8 text-white rounded-lg">
        <div className="text-center mb-6">
        <h3 className="text-5xl font-semibold mb-2 text-transparent bg-clip-text dark:bg-gradient-to-r from-teal-300 to-cyan-200 transition-all duration-500 ease-in-out bg-[#0e8174] to-[#10ad9b]">

    {`Welcome Back, ${firstName}!`}
  </h3>
  <p className="text-xl text-[#1E2A38] dark:text-gray-50 opacity-80 transition-all duration-300 ease-in-out hover:opacity-100">
    Manage your profile below.
  </p>
</div>

    
        {/* User Data Section */}
        <div className="dark:text-gray-200 p-6 rounded-xl mb-4">
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-teal-600 text-8xl hover:text-teal-500 transition-all duration-300" />
          </div>
          <h4 className="text-3xl text-gray-900 dark:text-gray-100 text-center font-semibold">{firstName} {lastName}</h4>
          <p className="text-lg text-gray-600 text-center dark:text-gray-300 mb-2">Email: <span className="font-medium">{email}</span></p>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300">Joined: <span className="font-medium">{formattedDate}</span></p>
        </div>
    
        {/* Edit Profile Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleEditClick}
            className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 ease-in-out hover:shadow-lg hover:glow-blue-500"
          >
            Edit Profile
          </button>
        </div>

{isEditing && (
  <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 dark:bg-gray-800 p-4 sm:p-8 rounded-xl shadow-xl text-white w-full max-w-md mx-auto">
    <div>
      <label htmlFor="firstName" className="block text-gray-900 dark:text-gray-100 text-lg sm:text-xl">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleInputChange}
        className="w-full px-4 py-3 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:shadow-lg"
      />
    </div>
    <div>
      <label htmlFor="lastName" className="block text-lg sm:text-xl text-gray-900 dark:text-gray-100">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleInputChange}
        className="w-full px-4 py-3 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:shadow-lg"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-lg sm:text-xl text-gray-900 dark:text-gray-100">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-4 py-3 mt-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:shadow-lg"
      />
    </div>
    <div className="flex flex-wrap gap-4 justify-between mt-8">
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={handleCancelEdit}
        className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 hover:shadow-lg"
      >
        Cancel
      </button>
    </div>
  </form>
)}

{/* Toast Notifications */}
<Toaster position="top-right" reverseOrder={false} />

</div>
  );
}