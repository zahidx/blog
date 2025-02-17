import React from 'react';
import { FaLaptopCode, FaHeart, FaGraduationCap } from 'react-icons/fa'; // Importing icons

const Categories = () => {
  return (
    <section id="categories" className="py-16 bg-[#e7f8f3] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Browse by Category</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Category 1 - Technology */}
          <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transform transition-all hover:shadow-2xl hover:border-l-4 hover:border-[#4c6ef5] dark:hover:border-[#4c6ef5]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#203175] to-[#0e2b7c] opacity-70 dark:bg-gradient-to-r dark:from-[#1e2d69] dark:to-[#2a4b8c]"></div>
            <div className="relative z-10 text-left p-8 text-white">
              {/* Flex container for icon and text */}
              <div className="flex items-center space-x-6">
                {/* Icon */}
                <div className="text-5xl">
                  <FaLaptopCode />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-2xl font-semibold">Technology</h3>
                  <p className="mt-2 text-sm">Latest tech trends, news, and insights</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4c6ef5] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>

          {/* Category 2 - Lifestyle */}
          <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transform transition-all hover:shadow-2xl hover:border-l-4 hover:border-[#ff7f50] dark:hover:border-[#ff7f50]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8f4125] to-[#922d1b] opacity-70 dark:bg-gradient-to-r dark:from-[#cc5c39] dark:to-[#d97b51]"></div>
            <div className="relative z-10 text-left p-8 text-white">
              {/* Flex container for icon and text */}
              <div className="flex items-center space-x-6">
                {/* Icon */}
                <div className="text-5xl">
                  <FaHeart />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-2xl font-semibold">Lifestyle</h3>
                  <p className="mt-2 text-sm">Health, wellness, and everyday living</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff7f50] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>

          {/* Category 3 - Education */}
          <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transform transition-all hover:shadow-2xl hover:border-l-4 hover:border-[#ffd700] dark:hover:border-[#ffd700]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a770a] to-[#948809] opacity-70 dark:bg-gradient-to-r dark:from-[#cba800] dark:to-[#ffb600]"></div>
            <div className="relative z-10 text-left p-8 text-white">
              {/* Flex container for icon and text */}
              <div className="flex items-center space-x-6">
                {/* Icon */}
                <div className="text-5xl">
                  <FaGraduationCap />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-2xl font-semibold">Education</h3>
                  <p className="mt-2 text-sm">Learning, growth, and skill development</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
