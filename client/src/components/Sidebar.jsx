import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Package,
  Bell,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  BarChart3,
  List,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "../components/ThemeToggle"; // Import ThemeToggle component

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [expandedSections, setExpandedSections] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    navigate("/");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const buyerMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/buyer" },
    {
      icon: FileText,
      label: "Contracts",
      path: "/dashboard/contracts",
      submenu: [
        { label: "Active Contracts", path: "/dashboard/active-contracts" },
        { label: "Pending Contracts", path: "/dashboard/pending-contracts" },
        { label: "Contract History", path: "/dashboard/contract-history" },
      ],
    },
    { icon: Package, label: "Track Orders", path: "/dashboard/track-orders" },
    { icon: ShoppingCart, label: "Cart", path: "/cart" },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: 3 },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const farmerMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/farmer" },
    {
      icon: FileText,
      label: "Contracts",
      path: "/dashboard/contracts",
      submenu: [
        { label: "Active Contracts", path: "/dashboard/active-contracts" },
        { label: "Pending Contracts", path: "/dashboard/pending-contracts" },
        { label: "Contract Requests", path: "/dashboard/contract-requests" },
      ],
    },
    {
      icon: List,
      label: "Crop Management",
      path: "/dashboard/crops",
      submenu: [
        { label: "Manage Listings", path: "/dashboard/manage-listings" },
        { label: "Add New Crop", path: "/dashboard/add-new-crop" },
        { label: "Crop Calendar", path: "/dashboard/crop-calendar" },
      ],
    },
    {
      icon: BarChart3,
      label: "Sales Reports",
      path: "/dashboard/sales-reports",
    },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: 2 },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const menuItems =
    user?.userType === "buyer" ? buyerMenuItems : farmerMenuItems;

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) => {
    if (item.submenu) {
      return item.submenu.some((subItem) => isActive(subItem.path));
    }
    return false;
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedSections[item.label];
    const itemIsActive = isActive(item.path) || isParentActive(item);

    return (
      <div key={item.path} className="space-y-1">
        <div
          className={`
            flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group
            ${
              itemIsActive
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
            }
          `}
          onClick={() => {
            if (hasSubmenu) {
              toggleSection(item.label);
            } else {
              navigate(item.path);
              setIsOpen(false);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <Icon
              className={`w-5 h-5 transition-transform duration-200 ${
                itemIsActive ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </div>
          {hasSubmenu && (
            <div className="transition-transform duration-200">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>

        {hasSubmenu && isExpanded && (
          <div className="ml-4 space-y-1 animate-fadeIn">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg transition-all duration-200 text-sm
                  ${
                    isActive(subItem.path)
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-lg transition-all duration-300
          ${
            isScrolled
              ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              : "bg-white dark:bg-gray-800"
          }
          hover:scale-110 active:scale-95
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl transform transition-all duration-300 ease-in-out border-r border-gray-200/50 dark:border-gray-700/50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isScrolled ? "lg:sticky lg:top-0 lg:h-screen" : ""}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    FarmEasy
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {user?.userType || "User"} Dashboard
                  </p>
                </div>
              </div>
              {/* Use ThemeToggle component */}
              <ThemeToggle className="p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110" />
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map(renderMenuItem)}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3 bg-gray-50/50 dark:bg-gray-800/50"></div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-sm mx-4 transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to logout? You'll need to sign in again to
              access your account.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default Sidebar;
