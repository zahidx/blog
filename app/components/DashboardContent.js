"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { FaLaptop, FaBed, FaHeartbeat, FaGraduationCap, FaFilm } from "react-icons/fa";  // Importing icons

ChartJS.register(ArcElement, Tooltip, Legend);

const categories = [
  { name: "Tech", icon: <FaLaptop size={40} color="#6366F1" /> },
  { name: "Lifestyle", icon: <FaBed size={40} color="#8B5CF6" /> },
  { name: "Health", icon: <FaHeartbeat size={40} color="#EC4899" /> },
  { name: "Education", icon: <FaGraduationCap size={40} color="#F59E0B" /> },
  { name: "Entertainment", icon: <FaFilm size={40} color="#10B981" /> },
];

const DashboardContent = () => {
  const [counts, setCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const chartRef = useRef(null);

  // Fetch overall counts
  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const countData = categories.reduce((acc, cat) => ({ ...acc, [cat.name]: 0 }), {});
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category && countData[data.category] !== undefined) {
          countData[data.category]++;
        }
      });
      setCounts(countData);
    })();
  }, []);

  // Fetch posts for a selected category
  const fetchPostsByCategory = async (category) => {
    const q = query(collection(db, "posts"), where("category", "==", category));
    const snapshot = await getDocs(q);
    const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsArray);
    setSelectedCategory(category);
  };

  // Handle chart segment click
  const handleChartClick = (event) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );
    if (elements.length) {
      const { index } = elements[0];
      fetchPostsByCategory(categories[index].name);
    }
  };

  const doughnutData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((cat) => counts[cat.name] || 0),
        backgroundColor: categories.map((cat) => cat.icon.props.color),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 12,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    rotation: Math.PI * 1.5, // Start the chart from the top
    plugins: {
      legend: { position: "right", labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: "Posts per Category", // Title for the ring
        font: { size: 16 },
      },
    },
    onClick: handleChartClick,
  };

  return (
    <div className="dark:bg-[#1E293B] p-8 rounded-lg shadow-xl">
      {!selectedCategory ? (
        <>
          <h2 className="text-3xl font-bold dark:text-white pb-6">Dashboard</h2>

          {/* Flex container to align both cards and ring in the same row */}
          <div className="flex justify-between items-start">
            {/* Left Side: 2x2 Grid for Category Cards */}
            <div className="w-1/2 pr-4">
              <div className="grid grid-cols-2 gap-6">
                {categories.map((category) => (
                  <motion.div
                    key={category.name}
                    onClick={() => fetchPostsByCategory(category.name)}
                    className="cursor-pointer bg-white dark:bg-[#2F3A47] shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      Posts: <span className="font-bold">{counts[category.name] || 0}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Ring Chart */}
            <div className="w-1/3">
              <h3 className="text-2xl font-bold dark:text-white text-left">
                Category Distribution
              </h3>
              <div style={{ width: "380px", height: "380px" }}>
                <Doughnut
                  ref={chartRef}
                  data={doughnutData}
                  options={doughnutOptions}
                />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Click on a ring segment to view posts
          </p>
        </>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">
            Posts in <span className="text-indigo-500">{selectedCategory}</span>
          </h3>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
          >
            Back
          </button>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-gray-300 pb-4">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {post.title || "No title"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {post.content
                    ? post.content.slice(0, 50) + "..."
                    : "No content"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
