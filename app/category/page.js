"use client";

import { useState, useEffect } from "react";
import { FaLaptopCode, FaCamera, FaPaintBrush, FaMusic, FaBook } from "react-icons/fa";
import { db } from '../components/firebaseConfig'; // Import your Firebase configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase Firestore imports

import "animate.css";
import CuteLoader from "../components/CuteLoader"; 

// Define the categoriesData structure
const categoriesData = [
  {
    id: 1,
    title: "Tech",
    icon: <FaLaptopCode />,
    description: "Explore the latest trends and tutorials in tech.",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Lifestyle",
    icon: <FaCamera />,
    description: "Discover stunning photos and lifestyle tips.",
    bgColor: "bg-gradient-to-r from-teal-400 to-green-500",
  },
  {
    id: 3,
    title: "Health",
    icon: <FaPaintBrush />,
    description: "Unleash creativity with inspiring design content.",
    bgColor: "bg-gradient-to-r from-red-400 to-pink-500",
  },
  {
    id: 4,
    title: "Education",
    icon: <FaMusic />,
    description: "Dive into the world of education and learning.",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    id: 5,
    title: "Entertainment",
    icon: <FaBook />,
    description: "Read reviews and insights from book lovers.",
    bgColor: "bg-gradient-to-r from-gray-600 to-black",
  },
];

export default function CategoryPage() {
  const [categoriesDataWithPosts, setCategoriesDataWithPosts] = useState([]);
  const [isPremium, setIsPremium] = useState(false); // State to track premium experience
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and posts count dynamically from Firestore
  useEffect(() => {
    const fetchCategoriesWithPostCount = async () => {
      const categoriesWithPostCount = [];

      for (let category of categoriesData) {
        // Query Firestore to count posts for each category
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("category", "==", category.title));
        const querySnapshot = await getDocs(q);
        const postCount = querySnapshot.size; // Get the number of posts for this category

        // Add post count to category data
        categoriesWithPostCount.push({
          ...category,
          postsCount: postCount,
        });
      }

      setCategoriesDataWithPosts(categoriesWithPostCount);
    };

    // Check local storage for the premium user flag
    const premiumUser = localStorage.getItem("isPremium") === "true";
    setIsPremium(premiumUser);

    fetchCategoriesWithPostCount();
  }, []);

  const handlePremiumUpgrade = () => {
    localStorage.setItem("isPremium", "true");
    setIsPremium(true);
  };

  useEffect(() => {
    // Simulating data fetching or any async task
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Replace with your actual async logic
  }, []);

  return (
    
    <div className={`min-h-screen ${isPremium ? "bg-gradient-to-r from-blue-800 to-blue-900" : "bg-gradient-to-r from-[#0E1628] to-[#380643]"} dark:bg-gradient-to-br dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-white transition-colors duration-300`}>

      {/* Trending Categories */}
      <section className="px-6 py-8">
        <h2 className={`text-4xl font-bold mt-20 text-center ${isPremium ? "text-yellow-500" : "text-yellow-500"} mb-6`}>
          Trending Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categoriesDataWithPosts.slice(0, 4).map((category) => (
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
      <section className="px-6 py-16 bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gray-900 transition-colors duration-300">
        <h2 className={`text-4xl font-bold text-center ${isPremium ? "text-yellow-500" : "text-yellow-500"} mb-10`}>
          Explore All Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {categoriesDataWithPosts.map((category) => (
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
