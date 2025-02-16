'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiHome, FiFileText, FiUsers, FiBarChart2, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { getAuth, signOut } from 'firebase/auth';
import DashboardContent from '../components/DashboardContent';
import PostsContent from '../components/PostsContent';
import ProfileContent from '../components/ProfileContent';
import AccountSettingsContent from '../components/AccountSettingsContent';
import ManagePostsContent from '../components/ManagePostsContent';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isClient, setIsClient] = useState(false); // Track client-side render
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'posts':
        return <PostsContent />;
      case 'accountSettings':
        return <AccountSettingsContent />;
      case 'dashboard':
        return <DashboardContent />;
      case 'managePosts':
        return <ManagePostsContent />;
      default:
        return <ProfileContent />;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      localStorage.removeItem('userData'); // Optionally clear cached user data
      sessionStorage.removeItem('userData'); // Optionally clear session storage data
      router.push('/login'); // Redirect to login page after logout (or home page)
    } catch (error) {
      console.error('Logout error: ', error.message);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-56 bg-white dark:bg-gray-800 p-5 shadow-md fixed h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-5">Blog Admin</h1>
        <nav className="space-y-2">
          <NavItem name="Profile" icon={<FiUser />} onClick={() => setActiveTab('profile')} />
          <NavItem name="My Posts" icon={<FiFileText />} onClick={() => setActiveTab('posts')} />
          <NavItem name="Settings" icon={<FiSettings />} onClick={() => setActiveTab('accountSettings')} />
          <NavItem name="Dashboard" icon={<FiBarChart2 />} onClick={() => setActiveTab('dashboard')} />
          <NavItem name="Manage Posts" icon={<FiFileText />} onClick={() => setActiveTab('managePosts')} />
        </nav>
        <LogoutButton onLogout={handleLogout} />
      </aside>

      {/* Main Content */}
      <main className="pt-16 flex-1 ml-48 p-6 bg-white dark:bg-gray-900 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

// Sidebar Navigation Item Component
function NavItem({ name, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2 mb-2 text-lg font-medium text-gray-700 dark:text-gray-200 rounded-lg transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {icon} <span className="ml-3">{name}</span>
    </button>
  );
}

// Logout Button Component
function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="w-full mt-10 flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
    >
      <FiLogOut className="mr-2" /> Logout
    </button>
  );
}
