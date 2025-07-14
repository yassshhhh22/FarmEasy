import React, { useState, useEffect } from "react";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  Tractor,
  Sprout,
  ShoppingBasket,
  UserCheck,
  Users,
  Heart,
  Sunrise,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const FarmerIllustration = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-green-200 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-green-900/40"></div>

      {/* Sun */}
      <div
        className={`absolute top-8 right-12 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transition-all duration-2000 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full animate-pulse"></div>
      </div>

      {/* Clouds */}
      <div
        className={`absolute top-16 left-20 w-16 h-8 bg-white/60 rounded-full transition-all duration-3000 ${
          animate ? "translate-x-4" : "-translate-x-4"
        }`}
      ></div>
      <div
        className={`absolute top-24 right-32 w-12 h-6 bg-white/40 rounded-full transition-all duration-4000 ${
          animate ? "-translate-x-2" : "translate-x-2"
        }`}
      ></div>

      {/* Mountains/Hills */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-300 to-green-200 dark:from-green-800/60 dark:to-green-700/60"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400 to-green-300 dark:from-green-700/60 dark:to-green-600/60"></div>

      {/* Grass Field */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-500 to-green-400 dark:from-green-600/60 dark:to-green-500/60">
        {/* Grass blades */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute bottom-0 w-1 bg-green-600 dark:bg-green-500/70 rounded-t-full transition-all duration-2000 delay-${
              i * 50
            } ${animate ? "h-3 opacity-100" : "h-1 opacity-50"}`}
            style={{ left: `${(i * 2) % 100}%` }}
          ></div>
        ))}
      </div>

      {/* Farmer Figure */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="w-16 h-20 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      {/* Sprouting Seeds scattered across field */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute bottom-4 transition-all duration-2000 delay-${
            500 + i * 200
          } ${animate ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          style={{ left: `${15 + i * 10}%` }}
        >
          <Sprout className="h-4 w-4 text-green-600" />
        </div>
      ))}
    </div>
  );
};

const BuyerIllustration = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* City Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-teal-100 to-teal-200 dark:from-sky-900/40 dark:via-teal-800/30 dark:to-teal-900/40"></div>

      {/* Buildings Skyline */}
      <div className="absolute bottom-0 left-0 w-full h-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute bottom-0 bg-gray-600/70 dark:bg-gray-400/50 transition-all duration-${
              1500 + i * 200
            } ${
              animate ? "opacity-100 translate-y-0" : "opacity-60 translate-y-4"
            }`}
            style={{
              left: `${i * 8.5}%`,
              width: `${6 + (i % 3) * 2}%`,
              height: `${60 + (i % 4) * 20}px`,
            }}
          >
            {/* Building windows */}
            <div className="grid grid-cols-2 gap-1 p-1 h-full">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="bg-yellow-300/60 rounded-sm"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Customer Figure */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="w-16 h-20 bg-gradient-to-b from-teal-600 to-teal-700 rounded-t-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full"></div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-teal-500 rounded-full"></div>
        </div>
      </div>

      {/* Shopping Basket */}
      <div
        className={`absolute bottom-8 right-1/3 transition-all duration-2000 delay-500 ${
          animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <ShoppingBasket className="h-12 w-12 text-teal-600" />
      </div>

      {/* Floating Vegetables and Fruits */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute transition-all duration-2000 delay-${
            700 + i * 300
          } ${
            animate
              ? "scale-100 opacity-100 rotate-12"
              : "scale-0 opacity-0 rotate-0"
          }`}
          style={{
            top: `${20 + i * 8}%`,
            left: `${20 + (i % 3) * 25}%`,
          }}
        >
          <div
            className={`w-6 h-6 rounded-full ${
              i % 3 === 0
                ? "bg-orange-400"
                : i % 3 === 1
                ? "bg-red-400"
                : "bg-green-400"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

const LoginPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState("");

  const isFarmer = userType === "farmer";
  const isBuyer = userType === "buyer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Direct API call to backend for authentication
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            userType,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        const actualUserType = userData.userType || userType;
        localStorage.setItem("userType", actualUserType);

        // Update auth context
        const authUserData = {
          email: userData.email,
          role: actualUserType,
          uid: userData.uid || userData.id,
          name: userData.name || userData.displayName,
        };
        login(authUserData);

        // Navigate based on user type
        if (actualUserType === "farmer") {
          navigate("/dashboard/farmer");
        } else {
          navigate("/dashboard/buyer");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeChange = (newType) => {
    if (newType !== userType) {
      setIsTransitioning(true);
      setTimeout(() => {
        setUserType(newType);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 300);
    }
  };

  // Theme configurations
  const farmerTheme = {
    gradient:
      "from-amber-50 via-green-50 to-yellow-50 dark:from-amber-900/20 dark:via-green-900/20 dark:to-yellow-900/20",
    buttonBg:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    illustration: <FarmerIllustration />,
    title: "Welcome Back, Farmer!",
    subtitle: "Continue growing your business with global reach",
  };

  const buyerTheme = {
    gradient:
      "from-sky-50 via-teal-50 to-blue-50 dark:from-sky-900/20 dark:via-teal-900/20 dark:to-blue-900/20",
    buttonBg:
      "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800",
    illustration: <BuyerIllustration />,
    title: "Welcome Back, Buyer!",
    subtitle: "Continue discovering fresh, quality produce",
  };

  const theme = isFarmer ? farmerTheme : buyerTheme;

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Animation Side - Always on LEFT for creative variation */}
      <div
        className={`w-2/5 bg-gradient-to-br ${
          theme.gradient
        } relative flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Floating Welcome Badge */}
        <div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
            isTransitioning
              ? "opacity-0 transform translate-y-4 scale-90"
              : "opacity-100 transform translate-y-0 scale-100"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-full backdrop-blur-md border shadow-xl ${
              isFarmer
                ? "bg-green-100/80 dark:bg-green-900/60 border-green-200 dark:border-green-700"
                : "bg-teal-100/80 dark:bg-teal-900/60 border-teal-200 dark:border-teal-700"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Leaf
                className={`h-5 w-5 transition-all duration-500 ${
                  isFarmer ? "text-green-600" : "text-teal-600"
                }`}
              />
              <span
                className={`text-base font-bold ${
                  isFarmer
                    ? "text-green-700 dark:text-green-300"
                    : "text-teal-700 dark:text-teal-300"
                }`}
              >
                FarmEasy
              </span>
            </div>
          </div>
        </div>

        {/* Creative Diagonal Stats Cards */}
        <div className="absolute top-16 left-4 space-y-2 z-10">
          <div
            className={`transform rotate-12 transition-all duration-1000 delay-300 ${
              isTransitioning ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">
                  10K+ Users
                </span>
              </div>
            </div>
          </div>

          <div
            className={`transform -rotate-6 transition-all duration-1000 delay-500 ${
              isTransitioning ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Heart className="h-3 w-3 text-red-500" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">
                  Trusted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Background Animation */}
        <div
          className={`w-full h-full transition-all duration-700 ${
            isTransitioning
              ? "opacity-30 transform scale-110 blur-sm"
              : "opacity-100 transform scale-100 blur-0"
          }`}
        >
          {theme.illustration}
        </div>

        {/* Bottom Quote */}
        <div
          className={`absolute bottom-4 left-4 right-4 z-10 transition-all duration-700 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-3 border border-white/20">
            <p
              className={`text-xs italic text-center ${
                isFarmer
                  ? "text-green-800 dark:text-green-200"
                  : "text-teal-800 dark:text-teal-200"
              }`}
            >
              "
              {isFarmer
                ? "Every seed planted is a step towards prosperity"
                : "Fresh produce, directly from the heart of the farm"}
              "
            </p>
          </div>
        </div>
      </div>

      {/* Form Side - Always on RIGHT, wider */}
      <div
        className={`w-3/5 bg-white dark:bg-gray-900 relative overflow-hidden transition-all duration-700 ease-in-out ${
          isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
                isFarmer ? "10b981" : "0891b2"
              }' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        {/* Main Form Container */}
        <div className="relative z-10 h-screen flex flex-col">
          {/* Top Bar with Theme Toggle */}
          <div className="flex justify-between items-center p-4">
            <div></div> {/* Spacer */}
            <ThemeToggle className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg" />
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col justify-center px-6 pb-4">
            {/* Header Section */}
            <div className="text-center mb-6">
              <div
                className={`inline-block transition-all duration-700 ${
                  isTransitioning
                    ? "opacity-0 scale-90"
                    : "opacity-100 scale-100"
                }`}
              >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  Welcome Back!
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {theme.subtitle}
                </p>
              </div>
            </div>

            {/* Enhanced User Type Toggle */}
            <div className="flex justify-center mb-6">
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-1.5 shadow-inner">
                {/* Animated Background */}
                <div
                  className={`absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r ${
                    isFarmer
                      ? "from-green-500 to-green-600"
                      : "from-teal-500 to-teal-600"
                  } rounded-xl shadow-lg transition-all duration-500 ease-out ${
                    isFarmer
                      ? "left-1.5 w-[calc(50%-6px)]"
                      : "left-1/2 w-[calc(50%-6px)]"
                  }`}
                ></div>

                <div className="relative flex">
                  <button
                    onClick={() => handleUserTypeChange("farmer")}
                    disabled={isTransitioning}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 flex items-center justify-center space-x-2 ${
                      isFarmer
                        ? "text-white shadow-lg transform scale-105"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    } ${isTransitioning ? "pointer-events-none" : ""}`}
                  >
                    <Tractor className="h-4 w-4" />
                    <span>I'm a Farmer</span>
                  </button>

                  <button
                    onClick={() => handleUserTypeChange("buyer")}
                    disabled={isTransitioning}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 flex items-center justify-center space-x-2 ${
                      isBuyer
                        ? "text-white shadow-lg transform scale-105"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    } ${isTransitioning ? "pointer-events-none" : ""}`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>I'm a Buyer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Form */}
            <div
              className={`max-w-sm mx-auto w-full transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-8"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Email Field with Enhanced Styling */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                        email
                          ? isFarmer
                            ? "text-green-500"
                            : "text-teal-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        isFarmer
                          ? "border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                          : "border-gray-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                      } hover:border-gray-300 dark:hover:border-gray-600`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Password Field with Enhanced Styling */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                        password
                          ? isFarmer
                            ? "text-green-500"
                            : "text-teal-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-300 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        isFarmer
                          ? "border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                          : "border-gray-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                      } hover:border-gray-300 dark:hover:border-gray-600`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Enhanced Options Row */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                        isFarmer
                          ? "border-green-300 checked:bg-green-500 checked:border-green-500 focus:ring-green-500/20"
                          : "border-teal-300 checked:bg-teal-500 checked:border-teal-500 focus:ring-teal-500/20"
                      } focus:ring-2`}
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                      Keep me signed in
                    </span>
                  </label>
                  <button
                    type="button"
                    className={`font-medium transition-colors duration-200 hover:underline ${
                      isFarmer
                        ? "text-green-600 hover:text-green-700 dark:text-green-400"
                        : "text-teal-600 hover:text-teal-700 dark:text-teal-400"
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isTransitioning}
                  className={`w-full ${theme.buttonBg} disabled:opacity-50 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mt-6 relative overflow-hidden group`}
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className="relative flex items-center space-x-2">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Signing you in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        {isFarmer ? (
                          <Sunrise className="h-4 w-4" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Enhanced Footer */}
              <div className="mt-4 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  New to FarmEasy?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className={`font-semibold transition-all duration-200 hover:underline ${
                      isFarmer
                        ? "text-green-600 hover:text-green-700 dark:text-green-400"
                        : "text-teal-600 hover:text-teal-700 dark:text-teal-400"
                    }`}
                  >
                    Create an account
                  </button>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Secure • Trusted • Growing Together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
                      