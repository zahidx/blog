import { useState } from 'react';

export default function EditModal({
  isModalOpen,
  setIsModalOpen,
  post,
  handleSaveChanges,
  setEditedTitle,
  setEditedContent,
  setEditedImage,
  setImagePreview,
  imagePreview
}) {
  const [editedTitle, setEditedTitleState] = useState(post.title);
  const [editedContent, setEditedContentState] = useState(post.content);

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

  const handleSave = () => {
    handleSaveChanges(editedTitle, editedContent);
    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full sm:w-[700px] max-w-full max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ease-in-out">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Edit Post</h3>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
            <input
              id="title"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitleState(e.target.value)}
              className="mt-2 p-4 w-full border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
            />
          </div>

          {/* Content */}
          <div className="mt-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
            <textarea
              id="content"
              value={editedContent}
              onChange={(e) => setEditedContentState(e.target.value)}
              className="mt-2 p-4 w-full h-48 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
            />
          </div>

          {/* Image */}
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

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleSave}
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
    )
  );
}
