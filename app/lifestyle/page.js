"use client";
import React, { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaSun } from "react-icons/fa"; // Lifestyle category icon
import PostModal from "../components/PostModal"; // Import the modal
import CuteLoader from "../components/CuteLoader"; // Import the CuteLoader

const LifestylePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to track the selected post
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLifestylePosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("category", "==", "Lifestyle"));
        const snapshot = await getDocs(q);
        const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching lifestyle posts:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the data is fetched
      }
    };
    fetchLifestylePosts();
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
        {/* Lifestyle Icon and Title in the Same Row */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <FaSun size={50} color="#FBBF24" />
          <h1 className="text-4xl font-semibold">Lifestyle Posts</h1>
        </div>

        {/* Display Loader while fetching posts */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CuteLoader /> {/* Show the CuteLoader */}
          </div>
        ) : (
          // Post Cards Layout with New Layout
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleCardClick(post)} // Open the modal on click
                >
                  <div className="flex flex-col lg:flex-row p-6">
                    {/* Post Image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title || "Lifestyle Post"}
                        className="w-full h-48 object-cover rounded-lg mb-4 lg:w-1/3 lg:h-36 lg:mr-4"
                      />
                    )}
                    {/* Post Content */}
                    <div className="flex flex-col justify-between w-full lg:w-2/3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
                        {post.title || "No title"}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {post.content ? `${post.content.substring(0, 80)}...` : "No content available."}
                      </p>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        By {post.author || "Unknown"} -{" "}
                        {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No lifestyle posts available.</p>
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </div>
  );
};

export default LifestylePage;
