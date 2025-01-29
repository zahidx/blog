"use client";
import { useState } from "react";
import { db } from "../components/firebaseConfig"; // Importing Firestore
import { collection, addDoc } from "firebase/firestore";

export default function PostsContent() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { title, content, author, category } = formData;
    if (!title || !content || !author || !category) {
      return "All fields except Image URL are required.";
    }
    return null;
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Add post data to Firestore
      await addDoc(collection(db, "posts"), {
        ...formData,
        createdAt: new Date(),
      });

      // Clear form fields
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        imageUrl: "",
      });

      setSuccess("Post added successfully!");
    } catch (err) {
      setError("Error adding post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Create a New Post</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Share your insights with the world. Please fill in the details below.
      </p>

      <form onSubmit={handlePostSubmit} className="mt-6 space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
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
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter your post content"
            rows="6"
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
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
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter image URL (optional)"
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
