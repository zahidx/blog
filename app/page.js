"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./components/firebaseConfig";
import Hero from "./Hero";
import Categories from "./Categories";
import PostModal from "./components/PostModal"; // Import modal component
import CuteLoader from "./components/CuteLoader"; // Import CuteLoader component

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post for modal
  const [loading, setLoading] = useState(true); // Loading state for Firebase data

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(6)); // Fetch last 6 posts
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-[#F9FAFB]  dark:bg-gray-900 dark:bg-opacity-70">
          <CuteLoader /> {/* Show the CuteLoader while loading */}
        </div>
      ) : (
        <>
          <Hero />
          <Categories />

          {/* Recent Posts Section */}
          <section className="relative py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                Recent Posts
              </h2>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden group cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedPost(post)} // Open modal
                    >
                      <Image
                        src={post.imageUrl || "/default-image.jpg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          {post.content
                            ? `${post.content.substring(0, 100)}...`
                            : "No content available."}
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          By {post.author || "Unknown"} -{" "}
                          {post.createdAt
                            ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                            : "Unknown date"}
                        </p>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
                )}
              </div>
            </div>
          </section>

          {/* Post Modal */}
          {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
        </>
      )}
    </div>
  );
}
