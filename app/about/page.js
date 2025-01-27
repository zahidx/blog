"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { DiHtml5, DiCss3Full, DiJavascript1, DiReact } from 'react-icons/di';
import { SiNextdotjs, SiTailwindcss, SiVuedotjs, SiMongodb } from 'react-icons/si'; // Import additional icons
import 'animate.css';
import Image from 'next/image';
import Profile from '../images/profile.png';

export default function About() {
  return (
    <div className="bg-gradient-to-r from-[#121212] to-[#1a202c] min-h-screen text-white">

{/* Hero Section */}
<header className="flex flex-col items-center justify-center px-8 py-24 text-center md:text-left animate__animated animate__fadeIn md:flex-row md:pl-[146px]">
  <div className="flex flex-col items-center md:items-start md:w-1/2 md:pr-0 pr-8 ">
    <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight animate__animated animate__fadeIn animate__delay-0.5s">
      Hello, I'm Zahidul Islam
    </h1>
    <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto md:mx-0 animate__animated animate__fadeIn animate__delay-1s">
      I am a passionate web developer, focused on creating seamless and user-friendly web experiences.
      I love to combine creativity and technology to build impactful digital solutions.
    </p>
  </div>
  <div className="md:w-1/2 mt-10 md:mt-0 md:px-0">
    <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-800 rounded-full shadow-lg overflow-hidden mx-auto animate__animated animate__zoomIn">
      {/* Profile Image using Next.js Image */}
      <Image
        src={Profile} // Path to the profile image
        alt="Profile"
        width={192} // Adjust the width and height according to your design
        height={192}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</header>


{/* Skills Section */}
<section className="py-16 bg-gray-800 px-4 md:px-8">
  <h2 className="text-4xl font-semibold text-center text-yellow-400 mb-10 animate__animated animate__fadeIn">
    My Skills
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-center">
    {/* HTML5 */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-yellow-400">
        <DiHtml5 />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">HTML5</h4>
    </div>
    {/* CSS3 */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-blue-500">
        <DiCss3Full />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">CSS3</h4>
    </div>
    {/* JavaScript */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-yellow-500">
        <DiJavascript1 />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">JavaScript</h4>
    </div>
    {/* React */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-teal-500">
        <DiReact />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">React</h4>
    </div>
    {/* Next.js */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-white">
        <SiNextdotjs />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">Next.js</h4>
    </div>
    {/* Tailwind CSS */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-blue-400">
        <SiTailwindcss />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">Tailwind CSS</h4>
    </div>
    {/* Vue.js */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-green-400">
        <SiVuedotjs />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">Vue.js</h4>
    </div>
    {/* MongoDB */}
    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
      <div className="text-6xl text-green-600">
        <SiMongodb />
      </div>
      <h4 className="text-xl font-semibold text-white mt-4">MongoDB</h4>
    </div>
  </div>
</section>



      {/* Contact Section */}
      <section className="py-16 bg-gray-900 px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-center text-yellow-400 mb-8 animate__animated animate__fadeIn animate__delay-2.5s">
          Let's Connect
        </h2>
        <div className="flex justify-center gap-8">
          {/* Email Icon */}
          <a
            href="mailto:your-email@example.com"
            className="text-5xl text-yellow-400 transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
          >
            <FaEnvelope />
          </a>
          {/* GitHub Icon */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="text-5xl text-gray-400 transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
          >
            <FaGithub />
          </a>
          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="text-5xl text-blue-500 transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>

    </div>
  );
}
