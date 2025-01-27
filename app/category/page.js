"use client";

import { useState } from "react";
import { FaLaptopCode, FaCamera, FaPaintBrush, FaMusic, FaBook } from "react-icons/fa";
import "animate.css";

const categoriesData = [
  {
    id: 1,
    title: "Technology",
    icon: <FaLaptopCode />,
    description: "Explore the latest trends and tutorials in tech.",
    postsCount: 25,
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Photography",
    icon: <FaCamera />,
    description: "Discover stunning photos and photography tips.",
    postsCount: 18,
    bgColor: "bg-gradient-to-r from-teal-400 to-green-500",
  },
  {
    id: 3,
    title: "Art & Design",
    icon: <FaPaintBrush />,
    description: "Unleash creativity with inspiring design content.",
    postsCount: 30,
    bgColor: "bg-gradient-to-r from-red-400 to-pink-500",
  },
  {
    id: 4,
    title: "Music",
    icon: <FaMusic />,
    description: "Dive into the world of music and audio production.",
    postsCount: 15,
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    id: 5,
    title: "Books",
    icon: <FaBook />,
    description: "Read reviews and insights from book lovers.",
    postsCount: 22,
    bgColor: "bg-gradient-to-r from-gray-600 to-black",
  },
];

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const filteredCategories = categoriesData.filter((category) =>
    category.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0E1628] to-[#380643]  dark:bg-gradient-to-br dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-white transition-colors duration-300">

{/* Header Section */}
<header className="text-center py-16">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text animate__animated animate__fadeInDown">
          CateGories
        </h1>
        <p className="text-xl text-gray-200 dark:text-gray-300 mt-4 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
          Browse through various categories and find blogs tailored to your interests.
        </p>
      </header>





      {/* Search Bar */}
      <div className="flex justify-center px-4 py-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl p-4 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-300"
          placeholder="Search categories..."
        />
      </div>

      {/* Trending Categories */}
      <section className="px-6 py-8 ">
        <h2 className="text-4xl font-bold text-center text-yellow-500 dark:text-yellow-400 mb-6">
          Trending Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categoriesData.slice(0, 4).map((category) => (
            <div
              key={category.id}
              className={`${category.bgColor} p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{category.icon}</span>
                <span className="text-xl font-bold bg-white text-gray-900 px-3 py-1 rounded-lg shadow">
                  {category.postsCount} Posts
                </span>
              </div>
              <h3 className="text-3xl font-extrabold mb-2">{category.title}</h3>
              <p className="text-lg opacity-90">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section className="px-6 py-16 bg-gradient-to-r from-[#0E1628] to-[#380643]  dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-center text-yellow-500 dark:text-yellow-400 mb-10">
          Explore All Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 text-gray-50 rounded-lg shadow-lg bg-[#374151] dark:bg-gray-800 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-5xl text-yellow-500 dark:text-yellow-400">
                  {category.icon}
                </span>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-sm text-gray-50 dark:text-gray-300">
                    {category.postsCount} Posts
                  </p>
                </div>
              </div>
              <p className="text-gray-50 dark:text-gray-300 mb-4">
                {category.description}
              </p>
              <button className="py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-lg dark:bg-gradient-to-r dark:from-blue-800 dark:to-blue-900 dark:hover:to-blue-700">
                View Posts
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
