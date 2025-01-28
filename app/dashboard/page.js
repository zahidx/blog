"use client";

import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../components/firebaseConfig"; // Adjust the import path as needed
import { Dialog } from "@headlessui/react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWriteBlogModalOpen, setIsWriteBlogModalOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Assuming the user data is stored under the "users" collection
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  // Handle Profile Update
  const handleProfileUpdate = async (newName, newEmail) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: newName,
          email: newEmail,
        });
        setUserData((prevData) => ({
          ...prevData,
          name: newName,
          email: newEmail,
        }));
        setIsProfileModalOpen(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      window.location.href = "/"; // Redirect to homepage or login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out.");
    }
  };

  // Handle Blog Submission and Store in Firestore
  const handleBlogSubmit = async () => {
    if (!blogTitle || !blogDescription) {
      alert("Please provide both a title and description for your blog.");
      return;
    }

    try {
      // Create a new blog document in the "blogs" collection
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "blogs"), {
          userId: user.uid,
          title: blogTitle,
          description: blogDescription,
          createdAt: new Date(),
        });
      }

      // Clear input fields and close modal
      setBlogTitle("");
      setBlogDescription("");
      setIsWriteBlogModalOpen(false);
      alert("Blog submitted successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to submit blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1F1F1F] text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsProfileModalOpen(true)}
            >
              Profile
            </button>
            <button
              className="text-sm bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Information */}
        {userData ? (
          <div className="mb-6">
            <p className="text-lg font-semibold">Welcome, {userData.name}</p>
            <p className="text-gray-600">Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <ul className="flex space-x-6">
            <li
              className={`cursor-pointer ${
                activeTab === "overview" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "write-blog" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("write-blog")}
            >
              Write Blog
            </li>
          </ul>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p>Here is a summary of your activities...</p>
            </div>
          )}
          {activeTab === "write-blog" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Write a Blog</h2>
              <button
                className="text-sm bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsWriteBlogModalOpen(true)}
              >
                Write Blog
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <Dialog open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Name"
              defaultValue={userData?.name || ""}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Email"
              defaultValue={userData?.email || ""}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleProfileUpdate(userData.name, userData.email)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Dialog>

      {/* Write Blog Modal */}
      <Dialog open={isWriteBlogModalOpen} onClose={() => setIsWriteBlogModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Write Blog</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Blog Title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Blog Description"
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleBlogSubmit}
            >
              Submit Blog
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
