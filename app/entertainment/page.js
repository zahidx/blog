"use client";
import React, { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaFilm } from "react-icons/fa"; // Entertainment category icon
import PostModal from "../components/PostModal"; // Import the modal
import CuteLoader from "../components/CuteLoader"; // Import the CuteLoader component

const EntertainmentPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to track the selected post
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchEntertainmentPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("category", "==", "Entertainment"));
        const snapshot = await getDocs(q);
        const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching entertainment posts:", error);
        setLoading(false); // Stop loading in case of error
      }
    };
    fetchEntertainmentPosts();
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
        {/* Entertainment Icon and Title */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <FaFilm size={50} color="#F59E0B" />
          <h1 className="text-4xl font-semibold">Entertainment Posts</h1>
        </div>

        {/* Show loader while posts are loading */}
        {loading ? (
          <CuteLoader />
        ) : (
          // Post Cards Layout with Unique Design
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleCardClick(post)} // Open the modal on click
                >
                  <div className="flex">
                    {/* Post Image (left side of the card) */}
                    {post.imageUrl && (
                      <div className="w-1/3">
                        <img
                          src={post.imageUrl}
                          alt={post.title || "Entertainment Post"}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>
                    )}

                    {/* Post Content (right side of the card) */}
                    <div className="w-2/3 p-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {post.title || "No title"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {post.content ? `${post.content.substring(0, 100)}...` : "No content available."}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By {post.author || "Unknown"} -{" "}
                        {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No entertainment posts available.</p>
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </div>
  );
};

export default EntertainmentPage;
