"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTags,
  faInfoCircle,
  faEnvelope,
  faSun,
  faMoon,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Check and load dark mode setting from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
      if (savedMode === "true") {
        document.documentElement.classList.add("dark");
      }
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <nav
      className={`${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
      } text-white shadow-lg fixed top-0 left-0 w-full z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-extrabold tracking-wide ml-20 sm:ml-0">
              <Link href="/" passHref>
                <span className="cursor-pointer hover:text-gray-200">
                  BlogSphere
                </span>
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" passHref>
              <span className="text-lg font-medium flex items-center gap-2 cursor-pointer transition hover:scale-110 hover:text-gray-300">
                <FontAwesomeIcon icon={faHome} />
                Home
              </span>
            </Link>
            <Link href="/category" passHref>
              <span className="text-lg font-medium flex items-center gap-2 cursor-pointer transition hover:scale-110 hover:text-gray-300">
                <FontAwesomeIcon icon={faTags} />
                Categories
              </span>
            </Link>
            <Link href="/about" passHref>
              <span className="text-lg font-medium flex items-center gap-2 cursor-pointer transition hover:scale-110 hover:text-gray-300">
                <FontAwesomeIcon icon={faInfoCircle} />
                About
              </span>
            </Link>
            <Link href="/contact" passHref>
              <span className="text-lg font-medium flex items-center gap-2 cursor-pointer transition hover:scale-110 hover:text-gray-300">
                <FontAwesomeIcon icon={faEnvelope} />
                Contact
              </span>
            </Link>
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center">
           <button
  onClick={toggleModal}
  className="hidden sm:flex ml-4 mr-6 text-lg font-medium items-center gap-2 cursor-pointer transition hover:bg-gray-700 px-4 py-2 rounded-md"
>
  Join Now
</button>


            {/* Dark mode toggler for desktop */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center justify-center p-2 rounded-md text-white bg-gray-800 hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <FontAwesomeIcon icon={faSun} className="h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />
              )}
            </button>

            {/* Mobile menu toggler */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 mr-2 rounded-md text-white hover:bg-purple-700 transition focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-gray-800" : "bg-purple-700"
          } transition-all duration-300`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            <Link href="/" passHref>
              <span className="block text-lg font-medium text-white cursor-pointer transition hover:bg-purple-600 px-4 py-2 rounded">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </span>
            </Link>
            <Link href="/category" passHref>
              <span className="block text-lg font-medium text-white cursor-pointer transition hover:bg-purple-600 px-4 py-2 rounded">
                <FontAwesomeIcon icon={faTags} className="mr-2" />
                Categories
              </span>
            </Link>
            <Link href="/about" passHref>
              <span className="block text-lg font-medium text-white cursor-pointer transition hover:bg-purple-600 px-4 py-2 rounded">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </span>
            </Link>
            <Link href="/contact" passHref>
              <span className="block text-lg font-medium text-white cursor-pointer transition hover:bg-purple-600 px-4 py-2 rounded">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contact
              </span>
            </Link>

            <button
              onClick={toggleModal}
              className="ml-4 text-lg bg-gray-600 font-medium flex items-center gap-2 cursor-pointer transition hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              Join Now
            </button>



            {/* Dark mode toggler for mobile */}
            <button
              onClick={toggleDarkMode}
              className="block w-full text-left text-lg font-medium text-white cursor-pointer transition hover:bg-purple-600 px-4 py-2 rounded flex items-center gap-2"
            >
              {darkMode ? (
                <FontAwesomeIcon icon={faSun} className="h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />
              )}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-lg transition-all duration-500 ease-in-out opacity-100"
          onClick={toggleModal}
        >
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-800 p-12 rounded-xl shadow-xl transform transition-all duration-700 ease-out scale-100 opacity-100 w-[90%] sm:w-[500px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={toggleModal}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-white text-4xl hover:text-gray-300 transition-transform duration-200 transform hover:scale-110"
              />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-extrabold text-white mb-6 text-center tracking-tight opacity-90 hover:opacity-100 transition duration-300 transform hover:text-yellow-400">
              Join the Community
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-8 text-center leading-relaxed opacity-80 hover:opacity-100 transition duration-300">
              Unlock access to exclusive content, connect with others, and start exploring the world of blogs.
            </p>

            {/* SignUp and Login Buttons */}
            <div className="flex flex-col gap-6">
              <Link href="/signup">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 px-6 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
                >
                  <i className="fas fa-user-plus mr-3"></i> Sign Up
                </button>
              </Link>

              <Link href="/login">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4 px-6 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
                >
                  <i className="fas fa-sign-in-alt mr-3"></i> Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
