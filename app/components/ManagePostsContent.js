'use client';

import { useState, useEffect } from "react";
import { db, auth, storage } from "../components/firebaseConfig";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function PostsContent() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: "", // For the image URL
    author: "", // Default empty, will be set later
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const fullName = `${userData.firstName} ${userData.lastName}`;
            setFormData((prevData) => ({ ...prevData, author: fullName }));
          } else {
            setFormData((prevData) => ({ ...prevData, author: user.displayName || "Anonymous" }));
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setError("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Save the post with image URL
      await addDoc(collection(db, "posts"), {
        ...formData,
        createdAt: new Date(),
      });

      // Reset form after successful post creation
      setFormData({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
        author: formData.author,
      });

      setSuccess("Post added successfully!");
      setLoading(false);
    } catch (err) {
      setError("Error adding post: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Create a New Post</h3>
      <form onSubmit={handlePostSubmit} className="mt-6 space-y-4">
        {/* Author Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            readOnly
          />
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter your post content"
            rows="6"
            required
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="AI">AI</option>
          </select>
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Paste image URL here"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full transition duration-300 ease-in-out hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
