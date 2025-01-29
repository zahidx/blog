'use client';

import { FiHome, FiFileText, FiUsers, FiBarChart2, FiLogOut, FiUser, FiSettings, FiBell, FiShield, FiHelpCircle } from 'react-icons/fi';
import { useState } from 'react';
import DashboardContent from '../components/DashboardContent';
import PostsContent from '../components/PostsContent';
import UsersContent from '../components/UsersContent';
import AnalyticsContent from '../components/AnalyticsContent';
import ProfileContent from '../components/ProfileContent';
import AccountSettingsContent from '../components/AccountSettingsContent';
import NotificationsContent from '../components/NotificationsContent';
import PrivacySettingsContent from '../components/PrivacySettingsContent';
import ActivityLogContent from '../components/ActivityLogContent';
import HelpCenterContent from '../components/HelpCenterContent';
import ManagePostsContent from '../components/ManagePostsContent';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'posts':
        return <ManagePostsContent />;
      case 'accountSettings':
        return <AccountSettingsContent />;
      case 'dashboard':
        return <DashboardContent />;
      case 'notifications':
        return <NotificationsContent />;
      case 'managePosts':
        return <PostsContent />;
      case 'privacySettings':
        return <PrivacySettingsContent />;
      case 'activityLog':
        return <ActivityLogContent />;
      case 'helpCenter':
        return <HelpCenterContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-5 shadow-md fixed h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-5">Blog Admin</h1>
        <nav className="space-y-2">
          <NavItem name="Profile" icon={<FiUser />} onClick={() => setActiveTab('profile')} />
          <NavItem name="My Posts" icon={<FiFileText />} onClick={() => setActiveTab('posts')} />
          <NavItem name="Account Settings" icon={<FiSettings />} onClick={() => setActiveTab('accountSettings')} />
          <NavItem name="Dashboard" icon={<FiBarChart2 />} onClick={() => setActiveTab('dashboard')} />
          <NavItem name="Notifications" icon={<FiBell />} onClick={() => setActiveTab('notifications')} />
          <NavItem name="Manage Posts" icon={<FiFileText />} onClick={() => setActiveTab('managePosts')} />
          <NavItem name="Privacy Settings" icon={<FiShield />} onClick={() => setActiveTab('privacySettings')} />
          <NavItem name="Activity Log" icon={<FiFileText />} onClick={() => setActiveTab('activityLog')} />
          <NavItem name="Help Center" icon={<FiHelpCircle />} onClick={() => setActiveTab('helpCenter')} />
        </nav>
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-white dark:bg-gray-900 overflow-y-auto h-screen">
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
function LogoutButton() {
  return (
    <button className="w-full mt-10 flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">
      <FiLogOut className="mr-2" /> Logout
    </button>
  );
}
