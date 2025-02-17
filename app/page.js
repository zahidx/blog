"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./components/firebaseConfig";
import Footer from "./components/Footer";
import "animate.css";
import Hero from "./Hero";
import Categories from "./Categories";

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
      <Hero />

      {/* Categories Section */}
      <Categories />

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
                    <p className="mt-2 text-sm text-gray-500">
                      By {post.author || "Unknown"} -{" "}
                      {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Unknown date"}
                    </p>
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
