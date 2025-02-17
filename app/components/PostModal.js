"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react"; // Icon for close button

export default function PostModal({ post, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close when clicking outside
      >
        {/* Close Button (Outside the modal) */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-transform transform hover:scale-110 z-50 dark:text-gray-400 dark:hover:text-red-400"
          onClick={onClose}
        >
          <XCircle className="w-10 h-10" />
        </button>

        <motion.div
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-6 overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Image */}
          <img
            src={post.imageUrl || "/default-image.jpg"}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md"
          />

          {/* Content (Scrollable with height limit) */}
          <div className="max-h-96 overflow-auto mt-4 pr-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {post.content || "No content available."}
            </p>
          </div>

          {/* Author Info */}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            By {post.author || "Unknown"} -{" "}
            {post.createdAt
              ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
              : "Unknown date"}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
