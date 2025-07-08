import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import SalesStats from "../../components/SalesStats";
import FlashDeals from "../../components/FlashDeals";
import MarketInsight from "../../components/MarketInsight";
import { Plus, Package, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FarmerDashboard = () => {
  const quickActions = [
    {
      title: "Add New Crop",
      description: "List a new crop for sale",
      icon: Plus,
      link: "/dashboard/add-crop",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Manage Listings",
      description: "Update your crop listings",
      icon: Package,
      link: "/dashboard/manage-listings",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Sales Reports",
      description: "View detailed analytics",
      icon: TrendingUp,
      link: "/dashboard/sales-reports",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Pending Contracts",
      description: "Review buyer offers",
      icon: Users,
      link: "/dashboard/pending-contracts",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, Farmer!</h1>
            <p className="text-green-100">
              Manage your crops, track sales, and connect with buyers to grow
              your business.
            </p>
          </div>

          {/* Sales Statistics */}
          <SalesStats />

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className={`${action.color} text-white p-6 rounded-lg transition-colors group`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="w-6 h-6" />
                      <h3 className="font-semibold">{action.title}</h3>
                    </div>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Insights */}
            <MarketInsight />

            {/* Flash Deals - Incoming Bulk Orders */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Bulk Order Opportunities
              </h2>
              <FlashDeals />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
