'use client';

import { FiX, FiUser, FiFileText, FiSettings, FiBarChart2, FiLogOut } from 'react-icons/fi';

export default function SideNavMobile({ isOpen, setIsOpen, setActiveTab, handleLogout }) {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-5 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Menu</h1>
        <button onClick={() => setIsOpen(false)} className="p-2 text-gray-700 dark:text-white">
          <FiX size={24} />
        </button>
      </div>
      <nav className="space-y-2">
        <NavItem name="Profile" icon={<FiUser />} onClick={() => { setActiveTab('profile'); setIsOpen(false); }} />
        <NavItem name="My Posts" icon={<FiFileText />} onClick={() => { setActiveTab('posts'); setIsOpen(false); }} />
        <NavItem name="Settings" icon={<FiSettings />} onClick={() => { setActiveTab('accountSettings'); setIsOpen(false); }} />
        <NavItem name="Dashboard" icon={<FiBarChart2 />} onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }} />
        <NavItem name="Manage Posts" icon={<FiFileText />} onClick={() => { setActiveTab('managePosts'); setIsOpen(false); }} />
      </nav>
      <LogoutButton onLogout={handleLogout} />
    </aside>
  );
}

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
