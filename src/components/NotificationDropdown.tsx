import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';
import {
  Bell,
  CheckCheck,
  Briefcase,
  Calendar,
  Award,
  AlertCircle,
  ExternalLink,
  X
} from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setSelectedJob, setActiveTab, jobs } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);
    if (notif.linkId) {
      const targetJob = jobs.find((j) => j.id === notif.linkId);
      if (targetJob) {
        setSelectedJob(targetJob);
      } else {
        setActiveTab('jobs');
      }
    }
    onClose();
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-4 h-4 text-sky-700" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-amber-700" />;
      case 'exam':
      case 'admit_card':
        return <Award className="w-4 h-4 text-indigo-700" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-sm">Recruitment Alerts</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-sky-500 text-white font-mono px-1.5 py-0.2 rounded">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-sky-300 hover:text-white flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-0.5 rounded font-medium transition-colors ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-2 py-0.5 rounded font-medium transition-colors ${
            filter === 'unread' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-3 text-left transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-3 ${
                !item.read ? 'bg-sky-50/50' : 'bg-white'
              }`}
            >
              <div className="p-1.5 bg-slate-100 rounded shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-600 font-mono shrink-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
                {item.linkId && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-800 font-medium mt-1">
                    View official details <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-slate-200 bg-slate-50 text-center">
        <button
          onClick={() => {
            setActiveTab('deadlines');
            onClose();
          }}
          className="text-xs font-medium text-sky-700 hover:text-sky-800"
        >
          View Full Deadline Tracker →
        </button>
      </div>
    </div>
  );
};
