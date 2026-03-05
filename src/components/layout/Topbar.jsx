import React from 'react';
import { RefreshCw, User, Trash2, Flag, HelpCircle, Power, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-blue-600 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-md">
      {/* Left: hamburger (mobile) + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick}
          className="md:hidden text-white p-1.5 hover:bg-blue-700 rounded-lg transition-colors shrink-0"
          aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h1 className="text-white font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide leading-tight truncate">
          AI Powered Real-Time Bed Tracking System
        </h1>
      </div>

      {/* Right: action icons */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-3">
        <button className="text-white/80 hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-colors" title="Refresh">
          <RefreshCw size={17} />
        </button>
        <button className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-blue-700 px-2 py-1.5 rounded-lg transition-colors text-sm font-medium" title="Profile">
          <User size={17} />
          <span className="hidden sm:inline">{user?.name?.split(' ')[0] ?? 'User'}</span>
        </button>
        <button className="text-white/80 hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-colors hidden sm:flex" title="Clear">
          <Trash2 size={17} />
        </button>
        <button className="text-white/80 hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-colors hidden sm:flex" title="Flag">
          <Flag size={17} />
        </button>
        <button className="text-white/80 hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-colors hidden sm:flex" title="Help">
          <HelpCircle size={17} />
        </button>
        <button onClick={logout}
          className="text-white/80 hover:text-red-300 hover:bg-blue-700 p-2 rounded-lg transition-colors" title="Sign out">
          <Power size={17} />
        </button>
      </div>
    </header>
  );
}
