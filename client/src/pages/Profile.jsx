import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Loader2,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    company: "",
    joinDate: "",
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api("/api/users/profile");
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to fetch profile");
      }
      const d = await res.json();
      const u = d.user || d.data?.user || d.data || d;
      setFormData({
        name: u.name || "",
        email: u.email || "",
        phone: u.phone || "",
        location: u.location || "",
        bio: u.bio || "",
        company: u.company || "",
        joinDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
      });
    } catch (e) {
      setError(e.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (error) setError("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api("/api/users/profile", {
        method: "PATCH",
        body: {
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          company: formData.company,
        },
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to update profile");
      }
      await res.json(); // consume response if needed
      await fetchProfile(); // ensure latest data from server
      setIsEditing(false);
    } catch (e) {
      setError(e.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const stats =
    user?.userType === "farmer"
      ? [
          {
            label: "Total Sales",
            value: "$24,580",
            color: "text-green-600 dark:text-green-400",
          },
          {
            label: "Active Listings",
            value: "12",
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Completed Orders",
            value: "156",
            color: "text-purple-600 dark:text-purple-400",
          },
          {
            label: "Customer Rating",
            value: "4.8/5",
            color: "text-yellow-600 dark:text-yellow-400",
          },
        ]
      : [
          {
            label: "Total Orders",
            value: "89",
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Total Spent",
            value: "$15,420",
            color: "text-green-600 dark:text-green-400",
          },
          {
            label: "Active Contracts",
            value: "7",
            color: "text-purple-600 dark:text-purple-400",
          },
          {
            label: "Saved Farmers",
            value: "23",
            color: "text-orange-600 dark:text-orange-400",
          },
        ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Loading profile...
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account information and preferences
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-400 mr-2">⚠️</span>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {formData.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center"
                >
                  <p className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Profile Information */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {formData.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {formData.email}
                      </span>
                      <span className="text-xs text-gray-500">
                        (Cannot be changed)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {formData.phone || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {formData.location || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {formData.company}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Join Date
                    </label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {new Date(formData.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
