"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { FaLaptop, FaBed, FaHeartbeat, FaGraduationCap, FaFilm } from "react-icons/fa";  

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

  const fetchPostsByCategory = async (category) => {
    const q = query(collection(db, "posts"), where("category", "==", category));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setSelectedCategory(category);
  };

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
    rotation: Math.PI * 1.5,
    plugins: {
      legend: { position: "right", labels: { font: { size: 14 } } },
      title: { display: true, text: "", font: { size: 16 } },
    },
    onClick: handleChartClick,
  };

  return (
    <div className="dark:bg-[#1E293B] p-6 md:p-8 rounded-lg shadow-xl">
      {!selectedCategory ? (
        <>
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white pb-4">Dashboard</h2>

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            
            {/* Left Side - Cards */}
            <div className="w-full md:w-1/2 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  onClick={() => fetchPostsByCategory(category.name)}
                  className="cursor-pointer bg-white dark:bg-[#2F3A47] shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transform hover:scale-105 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center">{category.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white text-center mt-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Posts: <span className="font-bold">{counts[category.name] || 0}</span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Chart */}
            <div className="w-full md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
              <h3 className="text-lg md:text-2xl font-bold dark:text-white mb-4">
                📶 Posts per Category
              </h3>
              <div className="w-full max-w-xs md:max-w-sm h-auto">
                <Doughnut ref={chartRef} data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Click on a ring segment to view posts
          </p>
        </>
      ) : (
        <div>
          <h3 className="text-xl md:text-2xl font-bold dark:text-white mb-4">
            Posts in <span className="text-indigo-500">{selectedCategory}</span>
          </h3>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
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
                  {post.content ? post.content.slice(0, 50) + "..." : "No content"}
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
