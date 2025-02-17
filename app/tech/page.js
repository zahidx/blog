"use client";
import React, { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaLaptop } from "react-icons/fa"; // Tech category icon
import PostModal from "../components/PostModal"; // Import the modal
import CuteLoader from "../components/CuteLoader"; // Import the CuteLoader

const TechPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to track the selected post
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTechPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("category", "==", "Tech"));
        const snapshot = await getDocs(q);
        const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching tech posts:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the data is fetched
      }
    };
    fetchTechPosts();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post); // Set the selected post to open the modal
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Tech Icon and Title in the Same Row */}
        <div className="flex items-center mt-10 justify-center space-x-4 mb-12">
          <FaLaptop size={50} color="#4C51BF" />
          <h1 className="text-4xl font-semibold">Tech Posts</h1>
        </div>

        {/* Display Loader while fetching posts */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CuteLoader /> {/* Show the CuteLoader */}
          </div>
        ) : (
          // Post Cards Layout
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleCardClick(post)} // Open the modal on click
                >
                  <div className="p-4">
                    {/* Post Image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title || "Tech Post"}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    {/* Post Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {post.title || "No title"}
                    </h3>
                    {/* Post Excerpt */}
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                      {post.content ? `${post.content.substring(0, 80)}...` : "No content available."}
                    </p>
                    {/* Post Author & Date */}
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      By {post.author || "Unknown"} -{" "}
                      {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No tech posts available.</p>
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </div>
  );
};

export default TechPage;
