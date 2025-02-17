// pages/index.js
import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative mt-10 bg-gradient-to-r from-[#61f775] to-[#37ec5f] dark:from-[#2a2a2a] dark:to-[#3c3c3c] text-white py-24 px-6">
        <div className="absolute inset-0 bg-black opacity-50 dark:bg-gray-800 opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-extrabold leading-tight sm:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            Welcome to Your Next Favorite Blog
          </motion.h1>
          <motion.p
            className="mt-4 text-lg sm:text-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
          >
            Explore captivating stories, insightful posts, and creative ideas from our vibrant community of writers.
          </motion.p>
          <motion.button
            className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full shadow-lg focus:outline-none transform transition duration-300 ease-in-out hover:scale-105 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
          >
            Start Reading
          </motion.button>
        </div>
      </section>

      {/* Optional Add-Ons: */}
      {/* Parallax effect on scroll, or another animation feature can be added here for added interaction */}
    </div>
  );
};

export default HomePage;
