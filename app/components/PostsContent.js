'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFirestore, query, collection, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../components/firebaseConfig';

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);  // For delete confirmation modal
  const [postToDelete, setPostToDelete] = useState(null);  // Track the post to be deleted

  const fetchUserData = useCallback(async () => {
    try {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (!user) throw new Error('User not authenticated.');

      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) throw new Error('No user data found.');

      const fetchedData = docSnap.data();
      localStorage.setItem('userData', JSON.stringify(fetchedData));
      setUserData(fetchedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async (author) => {
    try {
      const db = getFirestore(app);
      const postsQuery = query(collection(db, 'posts'), where('author', '==', author));
      const querySnapshot = await getDocs(postsQuery);

      const fetchedPosts = [];
      querySnapshot.forEach(doc => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(fetchedPosts);
    } catch (err) {
      setError('Error fetching posts: ' + err.message);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchUserData();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData) {
      const { firstName, lastName } = userData;
      const author = `${firstName} ${lastName}`;
      fetchPosts(author);
    }
  }, [userData, fetchPosts]);

  const handleReadMore = (postIndex) => {
    setExpandedPost(expandedPost === postIndex ? null : postIndex);
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setImagePreview(post.imageUrl || null); // Show current image as preview
    setIsModalOpen(true); // Open the modal
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore(app);
      const postRef = doc(db, 'posts', editingPost);

      // Save the image to Firestore Storage if a new image is uploaded
      let imageUrl = imagePreview;

      if (editedImage) {
        // You would upload the image to Firebase Storage here and get the URL.
        // For now, you can assume a function uploadImage that handles this.
        // imageUrl = await uploadImage(editedImage);
      }

      await updateDoc(postRef, {
        title: editedTitle,
        content: editedContent,
        imageUrl: imageUrl,
      });

      setPosts(posts.map(post => 
        post.id === editingPost ? { ...post, title: editedTitle, content: editedContent, imageUrl: imageUrl } : post
      ));

      setIsModalOpen(false); // Close the modal
      setEditingPost(null);
      setEditedTitle("");
      setEditedContent("");
      setEditedImage(null);
      setImagePreview(null);
    } catch (err) {
      setError("Error saving changes: " + err.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const db = getFirestore(app);
      const postRef = doc(db, 'posts', postToDelete);

      // Delete the post from Firestore
      await deleteDoc(postRef);

      // Remove the post from the local state
      setPosts(posts.filter(post => post.id !== postToDelete));

      setIsDeleteModalOpen(false); // Close the delete confirmation modal
      setPostToDelete(null); // Reset post to delete
    } catch (err) {
      setError("Error deleting post: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!isAuthenticated) return <p>User not authenticated. Please log in.</p>;
  if (!userData) return <p>No user data available. Please log in again.</p>;

  const { firstName, lastName } = userData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h3>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeletePost}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full sm:w-[700px] max-w-full max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ease-in-out">
      <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Edit Post</h3>
      
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          id="title"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="mt-2 p-4 w-full border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
        />
      </div>

      {/* Content Textarea */}
      <div className="mt-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
        <textarea
          id="content"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="mt-2 p-4 w-full h-48 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
        />
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Post Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-500 dark:text-gray-300"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-600 transition duration-200" />
          </div>
        )}
      </div>

      {/* Modal Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Save Changes
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Posts - Display two cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id} className="w-full bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col">
                {/* Image displayed at the top, full width */}
                <div
                  className="w-full h-56 bg-cover rounded-lg mb-4"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {expandedPost === index ? post.content : `${post.content.slice(0, 100)}...`}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleReadMore(index)}
                    className="text-blue-600"
                  >
                    {expandedPost === index ? 'Read Less' : 'Read More'}
                  </button>
                  <div>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setPostToDelete(post.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
