import React from "react";
import { Filter, CopyX } from "lucide-react";

export const RoomBookingFilter = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  capacityFilter,
  setCapacityFilter,
}) => {
  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCapacityFilter("all");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Header Section (Replaces CardHeader) */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
      </div>

      {/* Content Section (Replaces CardContent) */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search Filter */}
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Room name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Room Type Filter */}
          <div className="space-y-2">
            <label
              htmlFor="type-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="all">All Types</option>
              <option value="workspace">Workspace</option>
              <option value="conference">Conference Room</option>
            </select>
          </div>

          {/* Capacity Filter */}
          <div className="space-y-2">
            <label
              htmlFor="capacity-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Capacity
            </label>
            <select
              id="capacity-filter"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="all">All Capacities</option>
              <option value="1">1 Person</option>
              <option value="4">2-4 People</option>
              <option value="8">5-8 People</option>
              <option value="9">9-17 People</option>
              <option value="18+">18+ People</option>
            </select>
          </div>

          {/* Actions Button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm "
            >
              <CopyX className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
