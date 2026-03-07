import React from 'react';
import { Filter } from 'lucide-react';

export const BookingFilter = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Filter Bookings</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full max-w-xs space-y-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-secondary-foreground"
          >
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none "
          >
            <option value="all">All Bookings</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
    </div>
  );
};