import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import FlashDeals from "../../components/FlashDeals";
import CropGrid from "../../components/CropCard";
import ContractSummaryCard from "../../components/ContractSummaryCard";
import MarketInsight from "../../components/MarketInsight";
import SpendingOverview from "../../components/SpendingOverview";
import { api } from "../../lib/api"; // add this
import { useNavigate } from "react-router-dom"; // add this

const BuyerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // add this

  useEffect(() => {
    const loadCrops = async () => {
      try {
        setLoading(true);
        const res = await api("/api/crops/all");
        if (!res.ok) throw new Error("Failed to fetch crops");
        const d = await res.json();
        const data = d.data || d;
        const arr =
          data.items || data.crops || (Array.isArray(data) ? data : []);
        setCrops(arr); // ensure array
      } catch (e) {
        setError(e.message || "Failed to fetch crops");
      } finally {
        setLoading(false);
      }
    };
    loadCrops();
  }, []);

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
              <button
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => navigate("/search")}
              >
                View All
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading crops...
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <CropGrid crops={crops} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
