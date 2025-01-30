"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./components/firebaseConfig";
import Footer from "./components/Footer";
import "animate.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null); // State to track the expanded post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Toggle the expanded state to show/hide full description
  const toggleDescription = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0E1628] to-[#380643] text-white py-24 px-6">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Welcome to Your Next Favorite Blog
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light">
            Explore captivating stories, insightful posts, and creative ideas from our vibrant community of writers.
          </p>
          <button className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full shadow-lg focus:outline-none">
            Start Reading
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Browse by Category</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4e73df] to-[#1f74d7] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Technology</h3>
                <p className="mt-2 text-sm">Latest tech trends, news, and insights</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fd7e14] to-[#e04c3f] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Lifestyle</h3>
                <p className="mt-2 text-sm">Health, wellness, and everyday living</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f9ca24] to-[#f39c12] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Education</h3>
                <p className="mt-2 text-sm">Learning, growth, and skill development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Recent Posts</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
                  <Image
                    src={post.imageUrl || "/default-image.jpg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
                    unoptimized // Allow external images
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900">{post.title}</h3>
                    <p className="mt-2 text-gray-600">
                      {post.content
                        ? expandedPostId === post.id
                          ? post.content
                          : `${post.content.substring(0, 100)}...`
                        : "No content available."}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">By {post.author || "Unknown"} - {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}</p>
                    <button
                      onClick={() => toggleDescription(post.id)}
                      className="mt-4 text-indigo-600 hover:underline"
                    >
                      {expandedPostId === post.id ? "Show less" : "Read more"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
