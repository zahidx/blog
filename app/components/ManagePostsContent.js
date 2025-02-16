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
  const [authorEmail, setAuthorEmail] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setAuthor(user.displayName || '');
      setAuthorEmail(user.email || '');
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
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

      const postRef = collection(db, 'posts');
      await addDoc(postRef, {
        title,
        content,
        author,
        authorEmail,
        category,
        tags: tags.split(',').map((tag) => tag.trim()),
        createdAt: new Date(),
        imageUrl: imagePreview || null,
      });

      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      setCategory('');
      setTags('');
      setIsSubmitting(false);
      alert('Post created successfully!');
    } catch (err) {
      setError('Error creating post: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mt-5 mx-auto p-6 bg-[#f6fff8] dark:bg-gradient-to-r from-[#2F3A47] via-[#2F3A47] to-[#2F3A47] rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
        Create a New Post
      </h3>
      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
            required
          />

          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Your Email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
            required
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
          </select>

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
          />
        </div>

        <textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 h-36 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
          required
        />

        <div className="flex flex-col">
          <label htmlFor="imageUpload" className="text-gray-700 dark:text-white mb-2">
            Upload Image
          </label>
          <input
            id="imageUpload"
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full mt-3 rounded-lg shadow-lg"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
