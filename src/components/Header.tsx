import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationDropdown } from './NotificationDropdown';
import {
  Bell,
  Bookmark,
  Shield,
  Menu,
  X,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    notifications,
    savedJobIds,
    savedExamIds
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalSaved = savedJobIds.length + savedExamIds.length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'jobs', label: 'Government Jobs' },
    { id: 'exams', label: 'Exams' },
    { id: 'study', label: 'Study Prep' },
    { id: 'deadlines', label: 'Deadline Tracker' },
    { id: 'dashboard', label: 'My Dashboard' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white">
      {/* Top Banner Notice: Official Verification requirement */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs py-1 px-4 text-center border-b border-slate-800/80">
        <span className="font-semibold text-amber-400">Notice:</span> Always verify eligibility, dates, vacancies, and other details from the official government notification before applying.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center text-white shadow-xs group-hover:bg-sky-500 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors whitespace-nowrap">
                GovTech Careers
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors pb-0.5 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'text-white border-b-2 border-sky-400 font-semibold'
                    : 'hover:text-white hover:border-b-2 hover:border-slate-500 border-b-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Jobs Quick Link */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Saved Opportunities & Applications"
              aria-label="View saved jobs"
            >
              <Bookmark className="w-4 h-4" />
              {totalSaved > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-slate-700 text-sky-300 text-[10px] font-mono flex items-center justify-center border border-slate-900">
                  {totalSaved}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen((prev) => !prev)}
                className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Recruitment Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-mono flex items-center justify-center border border-slate-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
            </div>

            {/* Admin Console Quick Access */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap hidden sm:flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-sky-700 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-medium text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-sky-950/80 text-sky-300 border-l-2 border-sky-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 mt-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 text-left"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                <span>Admin Portal</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
