import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  Bell,
  Home,
  FileText,
  ShoppingCart,
  Settings,
  LogOut,
  Leaf,
  TrendingUp,
  Users,
  Shield,
  ChevronRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Star,
  MoreVertical,
  ArrowRight,
  Package,
  Truck,
  BarChart3,
  Globe,
  Smartphone,
  Database,
  Zap,
  Target,
  Award,
  Handshake,
  PieChart,
  RefreshCw,
  CloudRain,
  Sprout,
  Activity,
  Play,
  Building2,
  Factory,
  Store,
  ShoppingBag,
  TrendingDown,
  Percent,
  Timer,
  UserCheck,
  Scale,
  FileCheck,
  Coins,
  Network,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

const FadeInOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (element) observer.observe(element);
    return () => element && observer.unobserve(element);
  }, [element, delay]);

  return (
    <div
      ref={setElement}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const FloatingCard = ({ children, className = "" }) => (
  <div
    className={`transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${className}`}
  >
    {children}
  </div>
);

const UserTypeCard = ({
  type,
  icon: Icon,
  title,
  subtitle,
  features,
  color,
  gradient,
  onClick,
}) => (
  <FloatingCard>
    <div
      onClick={onClick}
      className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 h-full overflow-hidden group cursor-pointer hover:border-transparent"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />
      <div className="relative z-10">
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}
        >
          <Icon className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          {subtitle}
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 dark:text-gray-300"
            >
              <CheckCircle
                className={`h-5 w-5 text-${color}-500 mr-3 flex-shrink-0`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <button
            className={`w-full bg-gradient-to-r ${gradient} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105`}
          >
            Get Started as {type}
            <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </FloatingCard>
);

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("farmers");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Network,
      title: "Smart Marketplace",
      description:
        "AI-powered matching between farmers and buyers based on location, crop type, quality requirements, and pricing preferences.",
      color: "green",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: FileCheck,
      title: "Digital Contracts",
      description:
        "Legally binding digital contracts with automated milestone tracking, payment schedules, and dispute resolution mechanisms.",
      color: "blue",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Escrow-based payment system with multi-layer security, fraud protection, and guaranteed payment for completed deliveries.",
      color: "purple",
      gradient: "from-purple-400 to-violet-600",
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description:
        "Real-time price analytics, demand forecasting, seasonal trends, and competitor insights to optimize your trading decisions.",
      color: "orange",
      gradient: "from-orange-400 to-red-500",
    },
    {
      icon: Scale,
      title: "Quality Assurance",
      description:
        "Integrated quality verification system with photo documentation, third-party inspections, and quality scoring.",
      color: "teal",
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description:
        "End-to-end logistics coordination with verified transporters, real-time tracking, and delivery confirmation.",
      color: "indigo",
      gradient: "from-indigo-400 to-purple-500",
    },
  ];

  const farmerBenefits = [
    {
      icon: DollarSign,
      title: "Higher Profits",
      description:
        "Eliminate middlemen and get fair prices directly from buyers",
      stat: "40%",
      substat: "More Revenue",
    },
    {
      icon: UserCheck,
      title: "Guaranteed Sales",
      description: "Secure contracts before planting with verified buyers",
      stat: "95%",
      substat: "Contract Success",
    },
    {
      icon: Clock,
      title: "Faster Payments",
      description: "Automated payments upon delivery confirmation",
      stat: "24hrs",
      substat: "Payment Time",
    },
    {
      icon: Globe,
      title: "Market Access",
      description: "Connect with buyers across multiple states and countries",
      stat: "500+",
      substat: "Cities Covered",
    },
  ];

  const buyerBenefits = [
    {
      icon: Percent,
      title: "Cost Savings",
      description: "Direct sourcing reduces procurement costs significantly",
      stat: "25%",
      substat: "Cost Reduction",
    },
    {
      icon: Timer,
      title: "Reliable Supply",
      description: "Consistent quality and quantity with contract farming",
      stat: "99%",
      substat: "Delivery Rate",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Pre-verified quality standards and certification",
      stat: "A+",
      substat: "Quality Grade",
    },
    {
      icon: Coins,
      title: "Flexible Terms",
      description: "Customizable contracts with flexible payment options",
      stat: "12",
      substat: "Payment Plans",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description:
        "Sign up and complete verification process with documents and business details.",
      icon: User,
      farmers: "Upload farm documents, certifications, and crop history",
      buyers:
        "Submit business license, financial verification, and purchase history",
    },
    {
      step: 2,
      title: "Browse & Connect",
      description:
        "Discover opportunities and connect with potential partners.",
      icon: Search,
      farmers: "List your crops, quantities, and preferred contract terms",
      buyers: "Browse crop listings or post your specific requirements",
    },
    {
      step: 3,
      title: "Negotiate Terms",
      description: "Use our platform to discuss and finalize contract details.",
      icon: Handshake,
      farmers: "Negotiate prices, delivery schedules, and quality standards",
      buyers: "Agree on specifications, payment terms, and delivery logistics",
    },
    {
      step: 4,
      title: "Execute Contract",
      description:
        "Formalize agreements with digital contracts and payment protection.",
      icon: CheckCircle,
      farmers: "Receive advance payments and grow with guaranteed sales",
      buyers:
        "Track crop progress and ensure timely delivery of quality produce",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Wheat Farmer, Punjab",
      image: "👨‍🌾",
      content:
        "FarmEasy transformed my farming business. I now get 35% higher prices by selling directly to buyers, and the payment is guaranteed!",
      rating: 5,
    },
    {
      name: "Priya Enterprises",
      role: "Food Processing Company",
      image: "🏭",
      content:
        "We've reduced our procurement costs by 25% while ensuring consistent quality. The contract farming model gives us complete supply chain control.",
      rating: 5,
    },
    {
      name: "Suresh Patel",
      role: "Vegetable Farmer, Gujarat",
      image: "👨‍🌾",
      content:
        "No more worrying about market fluctuations. I have buyers lined up before I even plant my crops. It's revolutionary!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <Leaf className="h-8 w-8 text-green-600 transform group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 group-hover:animate-ping" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                FarmEasy
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md font-medium transition-all hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeInOnScroll>
            <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
              <Zap className="h-4 w-4 mr-2" />
              Connecting 50,000+ Farmers with 10,000+ Buyers Since 2025
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block">Bridge the Gap Between</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 animate-gradient">
                Farmers & Buyers
              </span>
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={400}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              <strong>For Farmers:</strong> Sell directly to verified buyers,
              get fair prices, and secure contracts before planting.
              <br />
              <strong>For Buyers:</strong> Source fresh produce directly from
              farmers, reduce costs, and ensure quality supply.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate("/signup")}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Sprout className="inline-block mr-2 h-5 w-5" />
                Join as Farmer
                <ChevronRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <ShoppingBag className="inline-block mr-2 h-5 w-5" />
                Join as Buyer
                <ChevronRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeInOnScroll>

          {/* Real-time Stats */}
          <FadeInOnScroll delay={800}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Active Farmers", value: "52,847", trend: "+12%" },
                  { label: "Verified Buyers", value: "11,234", trend: "+8%" },
                  {
                    label: "Contracts Completed",
                    value: "127K+",
                    trend: "+25%",
                  },
                  {
                    label: "Revenue Generated",
                    value: "₹850Cr+",
                    trend: "+35%",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      {stat.label}
                    </div>
                    <div className="text-green-500 text-xs font-medium">
                      {stat.trend} this month
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Path
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Whether you're growing crops or sourcing produce, we have
                tailored solutions for your needs
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FadeInOnScroll delay={200}>
              <UserTypeCard
                type="Farmer"
                icon={Sprout}
                title="For Farmers"
                subtitle="Grow with guaranteed sales and fair prices"
                features={[
                  "List crops with expected quantities and timelines",
                  "Connect with verified buyers across multiple regions",
                  "Secure contracts before planting with advance payments",
                  "Get 25-40% higher prices than traditional markets",
                  "Track payments and deliveries in real-time",
                  "Access weather updates and farming insights",
                ]}
                color="green"
                gradient="from-green-500 to-emerald-600"
                onClick={() => navigate("/signup?type=farmer")}
              />
            </FadeInOnScroll>

            <FadeInOnScroll delay={400}>
              <UserTypeCard
                type="Buyer"
                icon={ShoppingBag}
                title="For Buyers"
                subtitle="Source fresh produce directly from farms"
                features={[
                  "Browse available crops and post specific requirements",
                  "Connect directly with verified farmers",
                  "Negotiate prices and contract terms transparently",
                  "Reduce procurement costs by 20-30%",
                  "Ensure consistent quality and supply",
                  "Track crop progress and delivery schedules",
                ]}
                color="blue"
                gradient="from-blue-500 to-cyan-600"
                onClick={() => navigate("/signup?type=buyer")}
              />
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features for Modern Agriculture
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to revolutionize how farmers and buyers
                connect, contract, and collaborate
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInOnScroll key={index} delay={index * 100}>
                <FloatingCard className="h-full">
                  <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FloatingCard>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Tabs */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Real Results, Real Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                See how FarmEasy transforms agricultural commerce for everyone
              </p>

              {/* Tab Navigation */}
              <div className="flex justify-center mb-12">
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("farmers")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "farmers"
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:text-green-600"
                    }`}
                  >
                    <Sprout className="inline-block mr-2 h-5 w-5" />
                    For Farmers
                  </button>
                  <button
                    onClick={() => setActiveTab("buyers")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "buyers"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                    }`}
                  >
                    <ShoppingBag className="inline-block mr-2 h-5 w-5" />
                    For Buyers
                  </button>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === "farmers" ? farmerBenefits : buyerBenefits).map(
              (benefit, index) => (
                <FadeInOnScroll key={index} delay={index * 150}>
                  <FloatingCard>
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center group">
                      <div
                        className={`inline-flex p-4 rounded-full bg-${
                          activeTab === "farmers" ? "green" : "blue"
                        }-100 dark:bg-${
                          activeTab === "farmers" ? "green" : "blue"
                        }-900/30 mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <benefit.icon
                          className={`h-8 w-8 text-${
                            activeTab === "farmers" ? "green" : "blue"
                          }-600`}
                        />
                      </div>
                      <div
                        className={`text-4xl font-bold text-${
                          activeTab === "farmers" ? "green" : "blue"
                        }-600 mb-1`}
                      >
                        {benefit.stat}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {benefit.substat}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </FloatingCard>
                </FadeInOnScroll>
              )
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Simple Process, Powerful Results
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get started in just four simple steps, whether you're farming or
                buying
              </p>
            </div>
          </FadeInOnScroll>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-blue-400 to-emerald-600 transform -translate-y-1/2" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <FadeInOnScroll key={index} delay={index * 200}>
                  <div className="text-center relative group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 via-blue-500 to-emerald-600 text-white rounded-full font-bold text-xl mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-all">
                      <step.icon className="h-8 w-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {step.description}
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-green-700 dark:text-green-300">
                          <strong>Farmers:</strong> {step.farmers}
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-blue-700 dark:text-blue-300">
                          <strong>Buyers:</strong> {step.buyers}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Real people, real results, real transformation
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInOnScroll key={index} delay={index * 200}>
                <FloatingCard>
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 h-full">
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{testimonial.image}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </FloatingCard>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Pay only when you succeed. No hidden fees, no upfront costs.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeInOnScroll delay={200}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-green-200 dark:border-green-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    For Farmers
                  </h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    2.5%
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                      per successful contract
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Only pay when you make a sale
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited crop listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Direct buyer connections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Contract management tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Payment protection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Market analytics</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/signup?type=farmer")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Start Farming Smart
                </button>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={400}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium">
                  Best Value
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    For Buyers
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    1.5%
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                      per successful contract
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Only pay for completed purchases
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Browse all crop listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Post purchase requirements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Quality assurance tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Logistics coordination</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Supply chain analytics</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/signup?type=buyer")}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Start Sourcing Smart
                </button>
              </div>
            </FadeInOnScroll>
          </div>

          <FadeInOnScroll delay={600}>
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need custom pricing for large volumes?
              </p>
              <button className="text-green-600 hover:text-green-700 font-semibold">
                Contact our Enterprise team →
              </button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join the agricultural revolution. Whether you're growing crops or
              sourcing produce, connect with thousands of verified partners on
              India's most trusted farming platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signup?type=farmer")}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                <Sprout className="inline-block mr-2 h-5 w-5" />
                Join as Farmer
              </button>
              <button
                onClick={() => navigate("/signup?type=buyer")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                <ShoppingBag className="inline-block mr-2 h-5 w-5" />
                Join as Buyer
              </button>
            </div>
            <div className="mt-8 text-green-100">
              <p className="text-sm">
                ✓ Free to join ✓ No setup fees ✓ Pay only on success
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">FarmEasy</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing agriculture by connecting farmers directly with
                buyers, creating sustainable partnerships, and building the
                future of food commerce.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                    >
                      <Globe className="h-5 w-5" />
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">
                  Sell Your Crops
                </li>
                <li className="hover:text-white cursor-pointer">
                  Contract Farming
                </li>
                <li className="hover:text-white cursor-pointer">
                  Market Prices
                </li>
                <li className="hover:text-white cursor-pointer">
                  Success Stories
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">
                  Source Produce
                </li>
                <li className="hover:text-white cursor-pointer">
                  Browse Listings
                </li>
                <li className="hover:text-white cursor-pointer">
                  Quality Assurance
                </li>
                <li className="hover:text-white cursor-pointer">Bulk Orders</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 FarmEasy. Cultivating the future of agriculture.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm">All systems operational</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
