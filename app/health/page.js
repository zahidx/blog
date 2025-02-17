"use client";
import React, { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaHeartbeat } from "react-icons/fa"; // Health category icon
import PostModal from "../components/PostModal"; // Import the modal
import CuteLoader from "../components/CuteLoader"; // Import the loader

const HealthPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to track the selected post
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchHealthPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("category", "==", "Health"));
        const snapshot = await getDocs(q);
        const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching health posts:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchHealthPosts();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post); // Set the selected post to open the modal
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Health Icon and Title */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <FaHeartbeat size={50} color="#EF4444" />
          <h1 className="text-4xl font-semibold">Health Posts</h1>
        </div>

        {/* Show loader if data is still being fetched */}
        {loading ? (
          <CuteLoader />
        ) : (
          // Post Cards Layout with Unique Design
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleCardClick(post)} // Open the modal on click
                >
                  <div className="relative">
                    {/* Post Image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title || "Health Post"}
                        className="w-full h-60 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1 rounded-lg">
                      {post.category || "Health"}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {post.title || "No title"}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {post.content ? `${post.content.substring(0, 100)}...` : "No content available."}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By {post.author || "Unknown"} -{" "}
                      {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No health posts available.</p>
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </div>
  );
};

export default HealthPage;
