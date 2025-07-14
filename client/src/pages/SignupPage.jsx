import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Leaf,
  MapPin,
  Phone,
  Building,
  Sprout,
  ShoppingBasket,
  Sunrise,
  Heart,
  Shield,
  Users,
  Truck,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";


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

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("farmer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
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
      const userData = {
        name: formData.name,
        phone: formData.phone,
        userType: userType,
      };

      // Simulate API call for signup
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          userType: userType,
        }),
      });
      // Navigate to appropriate dashboard
      if (userType === "farmer") {
        navigate("/dashboard/farmer");
      } else {
        navigate("/dashboard/buyer");
      }
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        default:
          errorMessage = error.message || "Failed to create account";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    cardBg: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
    primaryColor: "green",
    accentColor: "amber",
    buttonBg:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    illustration: <FarmerIllustration />,
    title: "Join Our Farming Community",
    subtitle: "Connect directly with buyers and grow your business",
    ctaText: "Start Selling",
  };

  const buyerTheme = {
    gradient:
      "from-sky-50 via-teal-50 to-blue-50 dark:from-sky-900/20 dark:via-teal-900/20 dark:to-blue-900/20",
    cardBg: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
    primaryColor: "teal",
    accentColor: "sky",
    buttonBg:
      "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800",
    illustration: <BuyerIllustration />,
    title: "Fresh from Farm to You",
    subtitle: "Discover premium quality produce from local farmers",
    ctaText: "Start Buying",
  };

  const theme = isFarmer ? farmerTheme : buyerTheme;

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Form Side */}
      <div
        className={`w-1/2 bg-white dark:bg-gray-900 p-8 flex flex-col justify-center transition-all duration-500 ease-in-out ${
          isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
        } ${
          isFarmer
            ? "order-1 transform translate-x-0"
            : "order-2 transform translate-x-0"
        }`}
      >
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors" />
        </div>

        {/* User Type Toggle */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl p-1 flex">
            {/* Sliding background indicator */}
            <div
              className={`absolute top-1 h-[calc(100%-8px)] bg-white dark:bg-gray-600 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                isFarmer
                  ? "left-1 w-[calc(50%-4px)]"
                  : "left-1/2 w-[calc(50%-4px)]"
              }`}
            ></div>

            <button
              onClick={() => handleUserTypeChange("farmer")}
              disabled={isTransitioning}
              className={`relative z-10 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1 flex items-center justify-center space-x-2 ${
                isFarmer
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
              } ${isTransitioning ? "pointer-events-none" : ""}`}
            >
              <Sprout
                className={`h-4 w-4 transition-colors duration-300 ${
                  isFarmer
                    ? "text-green-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              />
              <span>Farmer</span>
            </button>

            <button
              onClick={() => handleUserTypeChange("buyer")}
              disabled={isTransitioning}
              className={`relative z-10 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1 flex items-center justify-center space-x-2 ${
                isBuyer
                  ? "text-teal-600 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
              } ${isTransitioning ? "pointer-events-none" : ""}`}
            >
              <ShoppingBasket
                className={`h-4 w-4 transition-colors duration-300 ${
                  isBuyer ? "text-teal-600" : "text-gray-600 dark:text-gray-300"
                }`}
              />
              <span>Buyer</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div
          className={`space-y-4 max-w-md mx-auto w-full transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              required
              className="mt-1 rounded border-gray-300 text-green-600 dark:text-teal-600 transition-colors"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              I agree to the{" "}
              <button className="text-green-600 dark:text-teal-600 hover:text-green-500 dark:hover:text-teal-500 transition-colors underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-green-600 dark:text-teal-600 hover:text-green-500 dark:hover:text-teal-500 transition-colors underline">
                Privacy Policy
              </button>
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || isTransitioning}
            className={`w-full ${theme.buttonBg} disabled:opacity-50 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mt-6`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>{theme.ctaText}</span>
                {isFarmer ? (
                  <Sunrise className="h-5 w-5" />
                ) : (
                  <Heart className="h-5 w-5" />
                )}
              </>
            )}
          </button>
        </div>

        {/* Footer Links */}
        <div
          className={`mt-6 text-center transition-all duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 dark:text-teal-600 hover:text-green-500 dark:hover:text-teal-500 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Animation Side */}
      <div
        className={`w-1/2 bg-gradient-to-br ${
          theme.gradient
        } relative flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
        } ${
          isFarmer
            ? "order-2 transform translate-x-0"
            : "order-1 transform translate-x-0"
        }`}
      >
        {/* Header */}
        <div
          className={`absolute top-8 left-8 right-8 text-center z-10 transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-4 group cursor-pointer">
            <div className="relative">
              <Leaf
                className={`h-10 w-10 transition-all duration-500 group-hover:scale-110 ${
                  isFarmer ? "text-green-600" : "text-teal-600"
                }`}
              />
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse transition-colors duration-500 ${
                  isFarmer ? "bg-amber-400" : "bg-sky-400"
                }`}
              ></div>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300">
              FarmEasy
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300">
            {theme.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 transition-all duration-300">
            {theme.subtitle}
          </p>
        </div>

        {/* Full Background Animation */}
        <div
          className={`w-full h-full transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 transform scale-110"
              : "opacity-100 transform scale-100"
          }`}
        >
          {theme.illustration}
        </div>

        {/* Footer */}
        <footer
          className={`absolute bottom-8 left-8 right-8 text-center text-sm text-gray-600 dark:text-gray-400 z-10 transition-all duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-xs">
            © 2025 FarmEasy. Connecting farms to tables.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
