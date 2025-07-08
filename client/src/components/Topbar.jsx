import React, { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, X, Menu, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Topbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.profile-dropdown')) {
        setShowProfile(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchValue('');
    setSearchFocused(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'New contract proposal', message: 'You have a new contract proposal from John Farm', time: '2 min ago', unread: true },
    { id: 2, title: 'Harvest ready', message: 'Your tomato harvest is ready for pickup', time: '1 hour ago', unread: true },
    { id: 3, title: 'Payment completed', message: 'Payment of $2,500 has been processed', time: '3 hours ago', unread: false },
  ];

  const recentSearches = ['Organic tomatoes', 'Wheat contracts', 'Local farmers'];

  return (
    <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 px-4 md:px-6 py-3 md:py-4 transition-all duration-300 sticky top-0 z-40 ${
      isScrolled ? 'shadow-lg bg-white/98 dark:bg-gray-900/98' : ''
    }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Search Bar */}
        <div className={`flex-1 max-w-md mx-4 md:mx-0 transition-all duration-300 ${
          searchFocused ? 'scale-105' : ''
        }`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
              searchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search crops, farmers, contracts..."
              className={`w-full pl-10 pr-10 py-3 rounded-xl transition-all duration-300 font-medium ${
                searchFocused
                  ? 'border-2 border-blue-500 ring-4 ring-blue-500/20 bg-white dark:bg-gray-800 shadow-lg text-gray-900 dark:text-white'
                  : 'border border-gray-300 dark:border-gray-600 bg-gray-50/80 dark:bg-gray-800/80 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500'
              } placeholder-gray-500 focus:outline-none`}
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* Search Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Recent searches
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300 transition-all duration-200 rounded-lg"
                        onClick={() => setSearchValue(item)}
                      >
                        <Search className="w-4 h-4 mr-3 text-gray-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative notifications-dropdown">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl hover:scale-110 active:scale-95"
            >
              <Bell className="w-6 h-6" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 w-80 animate-fadeIn">
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Mark all read</span>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white text-sm">{notification.title}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{notification.message}</p>
                          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
                  <Link
                    to="/notifications"
                    className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cart (only for buyers) */}
          {user?.role === 'buyer' && (
            <Link
              to="/cart"
              className="relative p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl hover:scale-110 active:scale-95"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg animate-bounce">
                2
              </span>
            </Link>
          )}

          {/* Profile */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || <User className="w-4 h-4" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="font-medium text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'User'}</p>
              </div>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>
            
            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 w-56 animate-fadeIn">
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Topbar;