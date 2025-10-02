import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../lib/api";
import { qs } from "../lib/query";
import Pagination from "../components/Pagination";
import CropGrid from "../components/CropCard";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const state = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 12,
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      region: searchParams.get("region") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "-createdAt",
    };
  }, [searchParams]);

  const setState = (patch) => {
    const next = { ...state, ...patch };
    setSearchParams(
      Object.fromEntries(
        Object.entries(next).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined
        )
      ),
      { replace: true }
    );
  };

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api(`/api/crops/all${qs(state)}`);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Failed to load listings");
      }
      const d = await res.json();
      const data = d.data || d;
      const arr = data.items || data.crops || (Array.isArray(data) ? data : []);
      setItems(arr);
      setTotal(data.total ?? (Array.isArray(data) ? arr.length : 0));
    } catch (e) {
      setError(e.message || "Failed to load listings");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.page,
    state.limit,
    state.search,
    state.category,
    state.region,
    state.minPrice,
    state.maxPrice,
    state.sort,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 min-w-0 max-w-full">
        <Topbar />
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Browse Listings
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 w-full md:w-auto">
              <input
                className="border rounded px-3 py-2"
                placeholder="Search"
                value={state.search}
                onChange={(e) => setState({ search: e.target.value, page: 1 })}
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Category"
                value={state.category}
                onChange={(e) =>
                  setState({ category: e.target.value, page: 1 })
                }
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Region"
                value={state.region}
                onChange={(e) => setState({ region: e.target.value, page: 1 })}
              />
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Min price"
                value={state.minPrice}
                onChange={(e) =>
                  setState({ minPrice: e.target.value, page: 1 })
                }
              />
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Max price"
                value={state.maxPrice}
                onChange={(e) =>
                  setState({ maxPrice: e.target.value, page: 1 })
                }
              />
              <select
                className="border rounded px-3 py-2"
                value={state.sort}
                onChange={(e) => setState({ sort: e.target.value })}
              >
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="-price">Price: High → Low</option>
                <option value="price">Price: Low → High</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No listings found.
            </div>
          ) : (
            <CropGrid crops={items} />
          )}

          <Pagination
            page={state.page}
            limit={state.limit}
            total={total}
            onPageChange={(n) => setState({ page: n })}
          />
        </main>
      </div>
    </div>
  );
}

export default Search;
