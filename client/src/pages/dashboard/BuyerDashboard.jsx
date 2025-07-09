import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import FlashDeals from "../../components/FlashDeals";
import CropGrid from "../../components/CropCard";
import ContractSummaryCard from "../../components/ContractSummaryCard";
import MarketInsight from "../../components/MarketInsight";
import SpendingOverview from "../../components/SpendingOverview";

const BuyerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 ">
      <Sidebar />

      <div className="flex-1 min-w-0 max-w-full">
        <Topbar />

        <main className="p-4 md:p-6 space-y-6 max-w-full overflow-x-hidden">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, Buyer!</h1>
            <p className="text-blue-100">
              Discover fresh crops, manage your contracts, and track your orders
              all in one place.
            </p>
          </div>

          {/* Contract Summary */}
          <ContractSummaryCard />

          {/* Flash Deals */}
          <FlashDeals />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            {/* Market Insights */}
            <div className="lg:col-span-1">
              <MarketInsight />
            </div>

            {/* Spending Overview */}
            <div className="lg:col-span-2">
              <SpendingOverview />
            </div>
          </div>

          {/* Recommended Crops */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recommended for You
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline">
                View All
              </button>
            </div>
            <CropGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
