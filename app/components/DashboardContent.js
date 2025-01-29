'use client';

import { FaUserCircle } from 'react-icons/fa';

export default function DashboardContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Your Dashboard</h3>
        
        {/* Dummy User Data Section */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-md mb-6">
          <FaUserCircle className="mx-auto text-6xl text-gray-400 mb-4" />
          <h4 className="text-xl font-semibold text-gray-800 mb-2">John Doe</h4>
          <p className="text-gray-600">Email: <span className="font-medium">johndoe@example.com</span></p>
          <p className="text-gray-600">Joined: <span className="font-medium">January 1, 2020</span></p>
        </div>

        {/* Dashboard Overview Section */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-md mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">Dashboard Overview</h4>
          <p className="text-gray-600">Here you can manage your settings, view analytics, and more.</p>
        </div>

        {/* Dummy Button (For navigating to another page or performing an action) */}
        <div className="flex justify-end">
          <button
            onClick={() => alert('Dummy Action Clicked!')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Perform Action
          </button>
        </div>
      </div>
    </div>
  );
}
