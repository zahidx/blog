'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SocialMediaPage = () => {
  return (
    <div>
      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0f2027] dark:to-[#2c5364] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-yellow-500 dark:text-yellow-400 mb-12">
            Connect with Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* GitHub Card */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="group bg-[#374151] dark:bg-[#374151] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              aria-label="GitHub Profile"
            >
              <div className="flex flex-col items-center">
                <FaGithub className="text-5xl text-green-600 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-white transition-colors duration-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-50 dark:text-gray-200">
                  GitHub
                </h3>
              </div>
            </a>
            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="group bg-[#374151] dark:bg-[#374151] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <div className="flex flex-col items-center">
                <FaLinkedin className="text-5xl text-blue-500 group-hover:text-blue-400 dark:group-hover:text-white transition-colors duration-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-50 dark:text-gray-200">
                  LinkedIn
                </h3>
              </div>
            </a>
            {/* Twitter Card */}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="group bg-[#374151] dark:bg-[#374151] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              aria-label="Twitter Profile"
            >
              <div className="flex flex-col items-center">
                <FaTwitter className="text-5xl text-blue-400 group-hover:text-blue-400 dark:group-hover:text-white transition-colors duration-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-50 dark:text-gray-200">
                  Twitter
                </h3>
              </div>
            </a>
            {/* Email Card */}
            <a
              href="mailto:your-email@example.com"
              className="group bg-[#374151] dark:bg-[#374151] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              aria-label="Email Me"
            >
              <div className="flex flex-col items-center">
                <FaEnvelope className="text-5xl text-yellow-500 group-hover:text-yellow-400 dark:group-hover:text-white transition-colors duration-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-50 dark:text-gray-200">
                  Email
                </h3>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPage;
