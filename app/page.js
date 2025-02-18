"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./components/firebaseConfig";
import Hero from "./Hero";
import Categories from "./Categories";
import PostModal from "./components/PostModal";
import CuteLoader from "./components/CuteLoader";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId] = useState("user123"); // Mock user ID (replace with auth user)

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"), limit(6));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Handle Like
  const toggleLike = useCallback(
    async (postId, likedBy) => {
      const postRef = doc(db, "posts", postId);
      const hasLiked = likedBy?.includes(userId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedBy: hasLiked
                  ? post.likedBy.filter((id) => id !== userId)
                  : [...post.likedBy, userId],
              }
            : post
        )
      );

      try {
        await updateDoc(postRef, {
          likedBy: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
        });
      } catch (error) {
        console.error("Error updating like:", error);
        toast.error("Failed to update like.");
      }
    },
    [userId]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-[#F9FAFB] dark:bg-gray-900 dark:bg-opacity-70">
          <CuteLoader />
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
                    >
                      <Image
                        src={post.imageUrl || "/default-image.jpg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                        priority
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
                            ? new Date(
                                post.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "Unknown date"}
                        </p>

                        {/* Like & Comment Section */}
                        <div className="mt-4 flex items-center justify-between">
                          <button
                            onClick={() =>
                              toggleLike(post.id, post.likedBy || [])
                            }
                            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-500"
                          >
                            {post.likedBy?.includes(userId) ? (
                              <HeartIconFilled className="w-6 h-6 text-red-500" />
                            ) : (
                              <HeartIcon className="w-6 h-6" />
                            )}
                            <span className="ml-1">{post.likedBy?.length || 0}</span>
                          </button>

                          <button
                            onClick={() => setSelectedPost(post)}
                            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
                          >
                            <ChatBubbleLeftIcon className="w-6 h-6" />
                            <span className="ml-1">{post.comments?.length || 0}</span>
                          </button>
                        </div>

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
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No posts available.
                  </p>
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
