// DeleteModal.js
import React from 'react';

export default function DeleteModal({ isOpen, onDelete, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full sm:w-[500px] shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Are you sure you want to delete this post?</h3>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
