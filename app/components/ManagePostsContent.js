'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../components/firebaseConfig';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(''); // Category state
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      setAuthor(user.displayName || '');
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (!user) {
        setError('User not authenticated');
        setIsSubmitting(false);
        return;
      }

      let imageUrl = imagePreview;
      if (image) {
        // Implement image upload to Firebase Storage here
      }

      const postRef = collection(db, 'posts');
      await addDoc(postRef, {
        title,
        content,
        author,
        category, // Save category to Firestore
        createdAt: new Date(),
        imageUrl: imageUrl || null,
      });

      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      setCategory(''); // Reset category after submission
      setIsSubmitting(false);
      alert('Post created successfully!');
    } catch (err) {
      setError('Error creating post: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 rounded-2xl shadow-lg">
      <h3 className="text-4xl font-semibold text-white mb-8 text-center">Create a New Post</h3>

      {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl dark:bg-gray-800">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-200">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-4 w-full text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 dark:text-gray-200">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-4 w-full text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300 ease-in-out"
            required
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Author Input */}
        <div>
          <label htmlFor="author" className="block text-lg font-medium text-gray-700 dark:text-gray-200">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-2 p-4 w-full text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-200">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 p-4 w-full h-40 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 dark:text-gray-200">Image (Optional)</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="mt-2 block w-full text-lg text-gray-500 dark:text-gray-300 rounded-xl border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 ease-in-out"
          />
          {imagePreview && (
            <div className="mt-6 flex justify-center">
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-xl shadow-xl border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
