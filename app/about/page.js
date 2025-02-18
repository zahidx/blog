'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { DiHtml5, DiCss3Full, DiJavascript1, DiReact } from 'react-icons/di';
import { SiNextdotjs, SiTailwindcss, SiVuedotjs, SiMongodb } from 'react-icons/si';
import Image from 'next/image';
import Profile from '../images/profile.png';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-back',
      once: true,
      mirror: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen text-white dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643]">
      
      {/* Hero Section */}
      <header className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-20 text-center md:text-left md:px-20 md:py-40" data-aos="fade-in">
        <div className="flex flex-col items-center md:items-start w-full md:w-2/3 md:pr-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight" data-aos="fade-up" data-aos-delay="500">
            Hey, I'm Zahidul Islam
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 dark:text-gray-200 mt-6 max-w-2xl mx-auto md:mx-0 text-justify" data-aos="fade-up" data-aos-delay="1000">
            I build seamless, visually engaging websites and applications. I’m passionate about solving real-world problems through creative code and modern frameworks.
          </p>
        </div>
        <div className="w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-gray-800 rounded-full shadow-xl overflow-hidden mt-10 md:mt-0" data-aos="zoom-in" data-aos-delay="1500">
          <Image
            src={Profile}
            alt="Profile"
            width={224}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-16 sm:py-24 px-6 md:px-20 bg-gradient-to-t from-[#0E1628] to-[#380643]" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-yellow-400 mb-12 sm:mb-16" data-aos="fade-in" data-aos-delay="2000">
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-12 justify-center">
          {[
            { icon: <DiHtml5 />, name: 'HTML5', color: 'text-yellow-400' },
            { icon: <DiCss3Full />, name: 'CSS3', color: 'text-blue-500' },
            { icon: <DiJavascript1 />, name: 'JavaScript', color: 'text-yellow-500' },
            { icon: <DiReact />, name: 'React', color: 'text-teal-500' },
            { icon: <SiNextdotjs />, name: 'Next.js', color: 'text-white' },
            { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: 'text-blue-400' },
            { icon: <SiVuedotjs />, name: 'Vue.js', color: 'text-green-400' },
            { icon: <SiMongodb />, name: 'MongoDB', color: 'text-green-600' },
          ].map(({ icon, name, color }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-gray-700 dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-600"
              data-aos="flip-left"
              data-aos-delay={200 * idx}
            >
              <div className={`text-4xl sm:text-5xl ${color}`}>
                {icon}
              </div>
              <h4 className="text-sm sm:text-lg md:text-xl font-semibold text-white mt-3 sm:mt-4">{name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 px-6 md:px-20 bg-gradient-to-b from-[#380643] to-[#0E1628]">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-yellow-400 mb-10 sm:mb-12">
          Let's Connect
        </h2>
        <div className="flex justify-center gap-6 sm:gap-10 text-3xl sm:text-4xl md:text-5xl">
          <a
            href="mailto:your-email@example.com"
            className="text-yellow-400 transform hover:scale-110 transition duration-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="text-gray-400 dark:text-gray-300 transform hover:scale-110 transition duration-300"

          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="text-blue-500 dark:text-blue-400 transform hover:scale-110 transition duration-300"

          >
            <FaLinkedin />
          </a>
        </div>
      </section>
    </div>
  );
}
