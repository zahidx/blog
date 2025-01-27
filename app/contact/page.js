"use client";

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import "animate.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <header className="text-center py-20">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text animate__animated animate__fadeInDown">
          Contact Me
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
          Have questions? Want to collaborate? Feel free to drop me a message. I'm here to help and connect!
        </p>
      </header>

      {/* Contact Form */}
      <section className="px-6 py-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8 animate__animated animate__fadeInLeft transition-colors duration-300">
          <h2 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-lg dark:text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

     {/* Social Media Section */}
<section className="py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
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
        className="group bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        aria-label="GitHub Profile"
      >
        <div className="flex flex-col items-center">
          <FaGithub className="text-5xl text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            GitHub
          </h3>
        </div>
      </a>
      {/* LinkedIn Card */}
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noreferrer"
        className="group bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        aria-label="LinkedIn Profile"
      >
        <div className="flex flex-col items-center">
          <FaLinkedin className="text-5xl text-blue-500 group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            LinkedIn
          </h3>
        </div>
      </a>
      {/* Twitter Card */}
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noreferrer"
        className="group bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        aria-label="Twitter Profile"
      >
        <div className="flex flex-col items-center">
          <FaTwitter className="text-5xl text-blue-400 group-hover:text-blue-500 dark:group-hover:text-white transition-colors duration-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Twitter
          </h3>
        </div>
      </a>
      {/* Email Card */}
      <a
        href="mailto:your-email@example.com"
        className="group bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        aria-label="Email Me"
      >
        <div className="flex flex-col items-center">
          <FaEnvelope className="text-5xl text-yellow-500 group-hover:text-yellow-600 dark:group-hover:text-white transition-colors duration-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Email
          </h3>
        </div>
      </a>
    </div>
  </div>
</section>


      {/* Map Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-5xl mx-auto animate__animated animate__fadeInRight transition-colors duration-300">
          <h2 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-6">
            Find Me Here
          </h2>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.46959398565!2d90.10782883625214!3d23.7805273185772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1737992497326!5m2!1sen!2sus"
            width="100%"
            height="300"
            className="rounded-xl border-none shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
