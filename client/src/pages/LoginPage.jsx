import React, { useState, useEffect } from "react";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  Tractor,
  Sun,
  Cloud,
  Sprout,
  Users,
  UserCheck,
  Moon,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle"; // Import ThemeToggle
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Import useTheme hook
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

const LoginPage = () => {
  const { isDark } = useTheme(); 
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [userType, setUserType] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [animateToggle, setAnimateToggle] = useState(false);

  const farmFacts = [
    "🌱 A single seed can grow into a tree that produces millions of seeds",
    "🚜 Modern farming feeds 170 people per farmer worldwide",
    "🌾 It takes about 37 gallons of water to grow 1 cup of coffee beans",
    "🐝 One-third of all food depends on bee pollination",
    "🌍 Agriculture employs over 1 billion people globally",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % farmFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (type) => {
    setAnimateToggle(true);
    setTimeout(() => {
      setUserType(type);
      setAnimateToggle(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login logic
    setTimeout(() => {
      const userData = { email, role: userType }; // Example user data
      login(userData); // Set user data in AuthContext
      if (userType === "farmer") {
        navigate("/dashboard/farmer");
      } else if (userType === "buyer") {
        navigate("/dashboard/buyer");
      } else {
        console.error("Invalid user type");
      }
      setIsLoading(false);
    }, 2000);
  };

  const isFarmer = userType === "farmer";

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isDark
          ? isFarmer
            ? "bg-gradient-to-br from-gray-900 via-green-900 to-gray-800"
            : "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
          : isFarmer
          ? "bg-gradient-to-br from-green-100 via-emerald-50 to-yellow-50"
          : "bg-gradient-to-br from-blue-100 via-sky-50 to-cyan-50"
      } relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Leaves for Farmer */}
        {isFarmer && (
          <>
            <div
              className="absolute top-20 left-10 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <Leaf
                className={`w-6 h-6 opacity-60 ${
                  isDark ? "text-green-300" : "text-green-400"
                }`}
              />
            </div>
            <div
              className="absolute top-40 right-20 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            >
              <Leaf
                className={`w-8 h-8 opacity-40 ${
                  isDark ? "text-green-400" : "text-green-500"
                }`}
              />
            </div>
            <div
              className="absolute bottom-32 left-16 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "5s" }}
            >
              <Sprout
                className={`w-5 h-5 opacity-50 ${
                  isDark ? "text-green-500" : "text-green-600"
                }`}
              />
            </div>
            <div
              className="absolute top-1/3 left-1/4 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              {isDark ? (
                <Moon className="w-12 h-12 text-gray-300 opacity-30" />
              ) : (
                <Sun className="w-12 h-12 text-yellow-400 opacity-30" />
              )}
            </div>
          </>
        )}

        {/* Floating Clouds for Buyer */}
        {!isFarmer && (
          <>
            <div
              className="absolute top-16 right-12 animate-pulse"
              style={{ animationDelay: "0s", animationDuration: "4s" }}
            >
              <Cloud
                className={`w-8 h-8 opacity-50 ${
                  isDark ? "text-blue-200" : "text-blue-300"
                }`}
              />
            </div>
            <div
              className="absolute top-1/3 left-8 animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "6s" }}
            >
              <Cloud
                className={`w-12 h-12 opacity-40 ${
                  isDark ? "text-sky-100" : "text-sky-200"
                }`}
              />
            </div>
            <div
              className="absolute bottom-40 right-1/4 animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            >
              <Cloud
                className={`w-6 h-6 opacity-60 ${
                  isDark ? "text-blue-300" : "text-blue-400"
                }`}
              />
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <ThemeToggle className="p-3 rounded-full transition-all duration-300 backdrop-blur-sm border hover:scale-110 shadow-lg" />
          </div>

          {/* Farm Fact Display */}
          <div className="text-center mb-8">
            <div
              className={`backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border transition-all duration-500 ${
                isDark
                  ? "bg-gray-800/70 border-gray-600/30"
                  : "bg-white/70 border-white/30"
              }`}
            >
              <p
                className={`text-sm font-medium transition-all duration-500 ${
                  isDark
                    ? isFarmer
                      ? "text-green-300"
                      : "text-blue-300"
                    : isFarmer
                    ? "text-green-700"
                    : "text-blue-700"
                }`}
              >
                {farmFacts[currentFact]}
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div
            className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 border transition-all duration-700 ${
              isDark
                ? isFarmer
                  ? "bg-gray-800/80 border-green-500/30 shadow-green-500/20"
                  : "bg-gray-800/80 border-blue-500/30 shadow-blue-500/20"
                : isFarmer
                ? "bg-white/80 border-green-200 shadow-green-200/50"
                : "bg-white/80 border-blue-200 shadow-blue-200/50"
            } ${
              animateToggle ? "scale-95 opacity-80" : "scale-100 opacity-100"
            }`}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <a
                href="/"
                className="flex items-center justify-center space-x-3 mb-6"
              >
                <div
                  className={`p-2 rounded-full transition-all duration-500 ${
                    isDark
                      ? isFarmer
                        ? "bg-green-900/50"
                        : "bg-blue-900/50"
                      : isFarmer
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Leaf
                    className={`h-8 w-8 transition-colors duration-500 ${
                      isDark
                        ? isFarmer
                          ? "text-green-400"
                          : "text-blue-400"
                        : isFarmer
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-3xl font-bold bg-gradient-to-r ${
                    isDark
                      ? "from-green-400 to-blue-400"
                      : "from-green-600 to-blue-600"
                  } bg-clip-text text-transparent`}
                >
                  FarmEasy
                </span>
              </a>

              <h2
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Welcome Back!
              </h2>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {isFarmer
                  ? "Connect with buyers worldwide"
                  : "Discover fresh, local produce"}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="mb-8">
              <div
                className={`relative rounded-2xl p-1 transition-all duration-500 ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div
                  className={`absolute top-1 bottom-1 w-1/2 rounded-xl transition-all duration-500 shadow-lg ${
                    isFarmer
                      ? "left-1 bg-gradient-to-r from-green-500 to-green-600"
                      : "left-1/2 bg-gradient-to-r from-blue-500 to-blue-600"
                  }`}
                />

                <div className="relative flex">
                  <button
                    onClick={() => handleToggle("farmer")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isFarmer
                        ? "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-green-400"
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    <Tractor className="w-5 h-5" />
                    <span>Farmer</span>
                  </button>

                  <button
                    onClick={() => handleToggle("buyer")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      !isFarmer
                        ? "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Buyer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="group">
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                          email
                            ? isFarmer
                              ? "text-green-500"
                              : "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-0 ${
                          isDark
                            ? email
                              ? isFarmer
                                ? "bg-gray-700/70 border-green-400 focus:border-green-300 text-white"
                                : "bg-gray-700/70 border-blue-400 focus:border-blue-300 text-white"
                              : "bg-gray-700/70 border-gray-500 focus:border-gray-400 text-white"
                            : email
                            ? isFarmer
                              ? "bg-white/70 border-green-300 focus:border-green-500 text-gray-900"
                              : "bg-white/70 border-blue-300 focus:border-blue-500 text-gray-900"
                            : "bg-white/70 border-gray-200 focus:border-gray-400 text-gray-900"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                          password
                            ? isFarmer
                              ? "text-green-500"
                              : "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-0 ${
                          isDark
                            ? password
                              ? isFarmer
                                ? "bg-gray-700/70 border-green-400 focus:border-green-300 text-white"
                                : "bg-gray-700/70 border-blue-400 focus:border-blue-300 text-white"
                              : "bg-gray-700/70 border-gray-500 focus:border-gray-400 text-white"
                            : password
                            ? isFarmer
                              ? "bg-white/70 border-green-300 focus:border-green-500 text-gray-900"
                              : "bg-white/70 border-blue-300 focus:border-blue-500 text-gray-900"
                            : "bg-white/70 border-gray-200 focus:border-gray-400 text-gray-900"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isDark
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className={`rounded border-2 text-transparent focus:ring-0 focus:ring-offset-0 transition-all duration-200 ${
                        isFarmer
                          ? "border-green-300 checked:bg-green-500 checked:border-green-500"
                          : "border-blue-300 checked:bg-blue-500 checked:border-blue-500"
                      }`}
                    />
                    <span
                      className={`ml-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className={`font-medium transition-colors duration-200 ${
                      isFarmer
                        ? "text-green-600 hover:text-green-500"
                        : "text-blue-600 hover:text-blue-500"
                    }`}
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : isFarmer
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-200"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-200"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      {isFarmer ? (
                        <UserCheck className="w-5 h-5" />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                      <span>Sign In as {isFarmer ? "Farmer" : "Buyer"}</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className={`font-semibold transition-colors duration-200 ${
                    isDark
                      ? isFarmer
                        ? "text-green-400 hover:text-green-300"
                        : "text-blue-400 hover:text-blue-300"
                      : isFarmer
                      ? "text-green-600 hover:text-green-500"
                      : "text-blue-600 hover:text-blue-500"
                  }`}
                >
                  Sign up
                </a>
              </p>
              <p
                className={`text-xs mt-2 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isFarmer
                  ? "Join thousands of farmers selling globally"
                  : "Discover farm-fresh produce near you"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
