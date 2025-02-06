import { useEffect, useState, useCallback } from 'react';
import { getFirestore, query, collection, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../components/firebaseConfig';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false); // State for Read More modal
  const [selectedPostContent, setSelectedPostContent] = useState(''); // Content to display in Read More modal
  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setImagePreview(post.imageUrl || null); // Show current image as preview
    setIsModalOpen(true); // Open the modal
  };

  const handleSaveChanges = async (editedTitle, editedContent) => {
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

      setEditingPost(null);
      setEditedTitle('');
      setEditedContent('');
      setEditedImage(null);
      setImagePreview(null);
    } catch (err) {
      setError('Error saving changes: ' + err.message);
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
      setError('Error deleting post: ' + err.message);
    }
  };

  const handleReadMore = (post) => {
    setSelectedPostContent(post.content); // Set the full content for the modal
    setIsReadMoreModalOpen(true); // Open the Read More modal
  };

  if (loading) return <div className="animate-pulse text-center">Loading...</div>;
  if (error) return <p>{error}</p>;
  if (!isAuthenticated) return <p>User not authenticated. Please log in.</p>;
  if (!userData) return <p>No user data available. Please log in again.</p>;

  const { firstName, lastName } = userData;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h3 className="text-4xl font-semibold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h3>
      </div>
  
      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-transform transform hover:scale-105">
              <img src={post.imageUrl || '/default-image.png'} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h4>
                <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">{post.content}</p>
                
                {/* Buttons Section */}
                <div className="flex space-x-6 mt-4">
                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadMore(post)}
                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none transition duration-300 transform hover:scale-110 hover:text-blue-900 dark:hover:text-blue-400 active:text-blue-700"
                  >
                    <svg
                      className="w-5 h-5 mr-2 transition duration-300 transform group-hover:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                    Read More
                  </button>
  
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditPost(post)}
                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none transition duration-300 transform hover:scale-110 hover:text-blue-900 dark:hover:text-blue-400 active:text-blue-700"
                  >
                    <svg
                      className="w-5 h-5 mr-2 transition duration-300 transform group-hover:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M17 3l4 4-10 10H3v-4l10-10z"></path>
                    </svg>
                    Edit
                  </button>
  
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      setPostToDelete(post.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 focus:outline-none active:bg-red-800 transition duration-300 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
  
      {/* Edit Modal */}
      {editingPost && (
        <EditModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          post={posts.find((post) => post.id === editingPost)} // Ensure post is valid
          handleSaveChanges={handleSaveChanges}
          setEditedTitle={setEditedTitle}
          setEditedContent={setEditedContent}
          setEditedImage={setEditedImage}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
      )}
  
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDeletePost}
        onClose={() => setIsDeleteModalOpen(false)}
      />
  
      {/* Read More Modal */}
      {isReadMoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg">
            <h4 className="text-2xl font-semibold">Post Content</h4>
            <p className="mt-4">{selectedPostContent}</p>
            <button
              onClick={() => setIsReadMoreModalOpen(false)}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none active:bg-blue-800 transition duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}  