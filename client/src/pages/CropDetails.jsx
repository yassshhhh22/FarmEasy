import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await api(`/api/crops/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Listing not found");
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to load listing");
      }
      const d = await res.json();
      setCrop(d.data || d);
    } catch (e) {
      setError(e.message || "Failed to load listing");
      setCrop(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const createContractFromListing = async () => {
    // Minimal UX via prompts to avoid UI changes
    const quantityStr = window.prompt("Quantity (e.g., 100):");
    if (quantityStr == null) return;
    const priceStr = window.prompt("Price (per unit):");
    if (priceStr == null) return;
    const deliveryDateStr = window.prompt("Delivery date (YYYY-MM-DD):");
    if (deliveryDateStr == null) return;
    const terms = window.prompt("Terms (optional):") || "Standard terms";

    const quantity = Number(quantityStr);
    const price = Number(priceStr);
    const deliveryDate = deliveryDateStr;

    if (!quantity || !price || !deliveryDate) {
      window.alert("Please provide valid quantity, price, and delivery date.");
      return;
    }

    try {
      const res = await api("/api/contracts/create", {
        method: "POST",
        body: { cropId: id, terms, quantity, price, deliveryDate },
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.message || "Failed to create contract");
      window.alert("Contract proposed successfully.");
    } catch (e) {
      window.alert(e.message || "Failed to create contract");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!crop)
    return <div className="p-6 text-gray-500">Listing unavailable.</div>;

  const isOwner =
    user &&
    (user._id === crop.ownerId ||
      user._id === crop.userId ||
      user._id === crop.farmer?._id);
  const isBuyer = user?.userType === "buyer";

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">
        {crop.title || crop.name || crop.cropName}
      </h1>
      <div className="text-gray-600">{crop.region || crop.location}</div>
      <div>Price: {crop.price ? `₹${crop.price}` : "-"}</div>
      <div>Quantity: {crop.quantity ?? "-"}</div>
      <div className="flex gap-2 pt-2">
        {isOwner ? (
          <>
            <button className="px-4 py-2 border rounded">Edit</button>
            <button className="px-4 py-2 border rounded">Delete</button>
          </>
        ) : isBuyer ? (
          <button
            className="px-4 py-2 rounded bg-green-600 text-white"
            onClick={createContractFromListing}
          >
            Express Interest
          </button>
        ) : null}
        <button
          className="px-4 py-2 border rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CropDetails;
