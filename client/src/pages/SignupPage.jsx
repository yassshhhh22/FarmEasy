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
import { useNavigate } from "react-router-dom"; // Added import for navigation

// Animated Illustrations
const FarmerIllustration = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-48 mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-green-100 dark:from-amber-900/20 dark:to-green-900/20">
      {/* Sun */}
      <div
        className={`absolute top-4 right-6 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transition-all duration-2000 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full animate-pulse"></div>
      </div>

      {/* Mountains */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-200 to-green-300 dark:from-green-800/50 dark:to-green-700/50"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-300 to-green-400 dark:from-green-700/50 dark:to-green-600/50"></div>

      {/* Farmer Figure */}
      <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="w-12 h-16 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      {/* Sprouting Seeds */}
      <div
        className={`absolute bottom-2 left-1/4 transition-all duration-2000 delay-500 ${
          animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Sprout className="h-6 w-6 text-green-500" />
      </div>
      <div
        className={`absolute bottom-3 right-1/4 transition-all duration-2000 delay-700 ${
          animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Sprout className="h-4 w-4 text-green-400" />
      </div>
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
    <div className="relative w-full h-48 mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-sky-100 to-teal-100 dark:from-sky-900/20 dark:to-teal-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 p-4">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-teal-400 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Customer Figure */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="w-12 h-16 bg-gradient-to-b from-teal-600 to-teal-700 rounded-t-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal-400 rounded-full"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-teal-500 rounded-full"></div>
        </div>
      </div>

      {/* Shopping Basket */}
      <div
        className={`absolute bottom-4 right-1/3 transition-all duration-2000 delay-500 ${
          animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <ShoppingBasket className="h-8 w-8 text-teal-600" />
        {/* Filling animation */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-green-400 to-transparent rounded-lg transition-all duration-1500 delay-1000 ${
            animate ? "h-full opacity-30" : "h-0 opacity-0"
          }`}
        ></div>
      </div>

      {/* Floating Vegetables */}
      <div
        className={`absolute top-6 left-1/4 transition-all duration-2000 delay-700 ${
          animate
            ? "scale-100 opacity-100 rotate-12"
            : "scale-0 opacity-0 rotate-0"
        }`}
      >
        <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
      </div>
      <div
        className={`absolute top-12 right-1/4 transition-all duration-2000 delay-900 ${
          animate
            ? "scale-100 opacity-100 -rotate-12"
            : "scale-0 opacity-0 rotate-0"
        }`}
      >
        <div className="w-3 h-5 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate(); // Use navigate hook
  const [userType, setUserType] = useState("farmer"); // Default to farmer
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Farmer specific
    farmName: "",
    cropsGrown: "",
    location: "",
    // Buyer specific
    deliveryAddress: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFarmer = userType === "farmer";
  const isBuyer = userType === "buyer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Navigate to the appropriate dashboard
      if (userType === "farmer") {
        navigate("/dashboard/farmer");
      } else {
        navigate("/dashboard/buyer");
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cropOptions = [
    "Wheat",
    "Rice",
    "Corn",
    "Tomatoes",
    "Potatoes",
    "Onions",
    "Carrots",
    "Lettuce",
    "Spinach",
    "Beans",
    "Peas",
    "Peppers",
    "Cucumbers",
    "Apples",
    "Oranges",
    "Bananas",
    "Strawberries",
    "Other",
  ];

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
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center px-4 py-8`}
    >
      <div className="max-w-md w-full">
        <div
          className={`${theme.cardBg} rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6 group cursor-pointer">
              <div className="relative">
                <Leaf
                  className={`h-10 w-10 text-${theme.primaryColor}-600 transition-transform group-hover:scale-110`}
                />
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 bg-${theme.accentColor}-400 rounded-full animate-pulse`}
                ></div>
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                FarmEasy
              </span>
            </div>

            {theme.illustration}

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {theme.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{theme.subtitle}</p>
          </div>

          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <ThemeToggle className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors" />{" "}
            {/* Updated usage */}
          </div>

          {/* User Type Toggle */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <button
              onClick={() => setUserType("farmer")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                isFarmer
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              🌾 Farmer
            </button>
            <button
              onClick={() => setUserType("buyer")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                isBuyer
                  ? "bg-teal-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              🏢 Buyer
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
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

            {/* Farmer-specific fields */}
            {isFarmer && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Farm Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="farmName"
                      required
                      value={formData.farmName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      placeholder="Enter your farm name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crops Grown
                  </label>
                  <div className="relative">
                    <Sprout className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="cropsGrown"
                      required
                      value={formData.cropsGrown}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white appearance-none transition-all"
                    >
                      <option value="">Select primary crop</option>
                      {cropOptions.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Farm Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      placeholder="Enter your farm location"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Buyer-specific fields */}
            {isBuyer && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="deliveryAddress"
                    required
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none"
                    placeholder="Enter your delivery address"
                  />
                </div>
              </div>
            )}

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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-teal-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
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
              disabled={isLoading}
              className={`w-full ${theme.buttonBg} disabled:opacity-50 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2`}
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
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <button className="text-green-600 dark:text-teal-600 hover:text-green-500 dark:hover:text-teal-500 font-medium transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Minimalistic Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center space-x-6">
            <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>Support</span>
            </button>
          </div>
          <p className="mt-4 text-xs">
            © 2025 FarmEasy. Connecting farms to tables.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;

