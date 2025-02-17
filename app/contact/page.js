"use client";
import { useState, useEffect } from "react";
import "animate.css";
import "aos/dist/aos.css";  // Import AOS styles
import AOS from "aos";       // Import AOS
import Maps from "./Maps";
import Social from "./social";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });  // Initialize AOS with a smooth animation duration
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <header className="text-center mt-5 py-16 sm:py-24">
        <h1 
          className="text-5xl sm:text-6xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text animate__animated animate__fadeInDown"
          data-aos="fade-down"
        >
          Contact Me
        </h1>
        <p 
          className="text-lg sm:text-xl text-gray-50 dark:text-gray-300 mt-4 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s"
          data-aos="fade-up"
        >
          Have questions? Want to collaborate? Feel free to drop me a message. Let's connect!
        </p>
      </header>

      {/* Contact Form */}
      <section className="px-6 -mt-20 py-12 sm:py-16 bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0f2027] dark:to-[#2c5364]">
        <div
          className="bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-br dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-8"
          data-aos="fade-left"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 dark:text-yellow-400">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-xl bg-[#374151] dark:bg-gray-700 text-gray-50 dark:text-white placeholder-gray-300 dark:placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Enter your name"
                required
                data-aos="fade-up"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-xl bg-[#374151] dark:bg-gray-700 text-gray-50 dark:text-white placeholder-gray-300 dark:placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Enter your email"
                required
                data-aos="fade-up"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full mt-2 p-4 rounded-xl bg-[#374151] dark:bg-gray-700 text-gray-50 dark:text-white placeholder-gray-300 dark:placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg transition-colors duration-300"
                placeholder="Write your message"
                required
                data-aos="fade-up"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-lg dark:text-white"
              data-aos="zoom-in"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Social Media Section */}
      <Social />
      {/* Maps Section */}
      <Maps />
    </div>
  );
}
